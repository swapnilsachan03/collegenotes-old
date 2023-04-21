import crypto from "crypto";
import sharp from "sharp";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Notes } from "../models/notes.js";
import { Subject } from "../models/subject.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import { getObjectSignedUrl, generateFileName, uploadFile, deleteFile } from "../utils/s3.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/stats.js";

// Authentication & Password Reset -----------------------------------------------------------------------------------------------

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if(!name || !email || !password) {
    return next(new ErrorHandler(
      "Please enter all fields", 400
    ));
  }

  let user = await User.findOne({email});
  if(user) {
    return next(new ErrorHandler(
      "User already exists!", 409
    ));
  }

  let imgName = undefined;

  if(file) {
    imgName = generateFileName(file.originalname);

    await new Promise((resolve, reject) => {
      sharp(file.buffer)
        .resize({
          width: 500,
          height: 500,
          fit: sharp.fit.cover
        })
        .toBuffer(async (err, buffer, info) => {
          if(buffer) {
            await uploadFile(buffer, imgName, file.mimetype);
            resolve();
          }
  
          else {
            return next(new ErrorHandler("Error while uploading image.", 500));
          }
        })
    })
  }

  try {
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        imgName,
        url: await getObjectSignedUrl(imgName)
      }
    })
  } catch (error) {
    if(imgName) await deleteFile(imgName);
    return next(new ErrorHandler(error._message, 500));
  }

  sendToken(res, user, "Registered successfully!", 201)
})

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new ErrorHandler(
      "Please enter all fields", 400
    ))
  }

  const user = await User.findOne({ email }).select("+password");
  if(!user) {
    return next(new ErrorHandler(
      "No user found with this email", 401
    ))
  }

  const passwordIsMatched = await user.comparePassword(password);
  if(!passwordIsMatched) {
    return next(new ErrorHandler(
      "Incorrect email or password", 401
    ))
  }

  sendToken(res, user, `Welcome back, ${user.name}`, 201);
})

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully!"
    });
})

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if(!user) {
    return next(new ErrorHandler("User is not registered", 400))
  }

  const resetToken = await user.getResetToken();
  await user.save();

  // Send token via e-mail
  const url = `${process.env.FRONTEND_URL}/reset_password/${resetToken}`
  const message = `Here's the link to reset your reCourse account password: ${url}. This link is valid only for 15 minutes. If you've not initiated the password reset request, please ignore.`
  await sendEmail(user.email, "CollegeNotes reset password link", message)

  res
    .status(200)
    .json({
      success: true,
      message: `Link to reset password sent to ${email}`
    })
})

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(token)
  .digest("hex")
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now()
    }
  })

  if(!user) {
    return next(new ErrorHandler(
      "Reset password link either invalid or expired.", 400
    ))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(200)
    .json({
      succes: true,
      message: "Password updated succesfully"
    })
})

// User Actions ------------------------------------------------------------------------------------------------------------------

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("favoriteSubjects", "_id id title description views numOfNotes")
    .populate("bookmarkedNotes");

  if(user.avatar.imgName) {
    user.avatar.url = await getObjectSignedUrl(user.avatar.imgName);
    await user.save();
  }

  res
    .status(200)
    .json({
      success: true,
      user
    })
})

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if(!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }

  const { name, degree, year } = req.body;
  const file = req.file;

  if(!name && !degree && !year && !file) {
    return next(new ErrorHandler("Please enter at least one field.", 400))
  }

  if(file) {
    const imgName = generateFileName(file.originalname);
    await deleteFile(user.avatar.imgName);

    await new Promise((resolve, reject) => {
      sharp(file.buffer)
        .resize({
          width: 500,
          height: 500,
          fit: sharp.fit.cover
        })
  
        .toBuffer(async (err, buffer, info) => {
          if(buffer) {
            await uploadFile(buffer, imgName, file.mimetype);
            user.avatar.imgName = imgName;
            resolve();
          }

          if(err) return next(new ErrorHandler("Error while uploading image.", 500));
        })
    })
  }

  if(name) user.name = name
  if(degree) user.degree = degree
  if(year) user.year = year

  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Profile updated successfully",
      user
    })
})

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  if(!newPassword || !oldPassword) {
    return next(new ErrorHandler(
      "Both fields are required", 400
    ))
  }

  if(oldPassword === newPassword) {
    return next(new ErrorHandler(
      "New password must be different from the old password.", 409
    ))
  }

  const passwordIsMatched = await user.comparePassword(oldPassword);
  if(!passwordIsMatched) {
    return next(new ErrorHandler(
      "Incorrect old password.", 400
    ))
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Password updated succesfully"
    })
})

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if(user.avatar.imgName) {
    await deleteFile(user.avatar.imgName);
  }

  await user.delete();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now())
    })
    .json({
      success: true,
      message: "Profile deleted successfully"
    })
})

export const addToBookmarks = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const notes = await Notes.findById(req.body.id);
  
  if(!notes) {
    return next(new ErrorHandler("Invalid notes ID", 400))
  }

  const isBookmarked = user.bookmarkedNotes.find((element) => {
    if(element.toString() === notes._id.toString()) {
      return true;
    }
  });

  if(isBookmarked) {
    return next(new ErrorHandler("Notes already bookmarked.", 400));
  }

  user.bookmarkedNotes.push(notes._id);
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Notes bookmarked successfully."
    })
})

export const removeFromBookmarks = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const notes = await Notes.findById(req.query.id);

  if(!notes) {
    return next(new ErrorHandler("Invalid notes ID", 400))
  }

  const newBookmarks = user.bookmarkedNotes.filter((element) => {
    if(element.toString() !== notes._id.toString()) {
      return element;
    }
  })

  user.bookmarkedNotes = newBookmarks;
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Notes unbookmarked successfully."
    })
})

export const addToFavorites = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const subject = await Subject.findById(req.body.id);

  if(!subject) {
    return next(new ErrorHandler("Invalid subject ID", 400))
  }

  const isFavorite = user.favoriteSubjects.find((element) => {
    if(element.toString() === subject._id.toString()) {
      return true;
    }
  });

  if(isFavorite) {
    return next(new ErrorHandler("Subject already in favorites.", 400));
  }

  user.favoriteSubjects.push(subject._id);
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Subject added to favorites."
    })
})

export const removeFromFavorites = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const subject = await Subject.findById(req.query.id);

  if(!subject) {
    return next(new ErrorHandler("Invalid subject ID", 400))
  }

  const newFavorites = user.favoriteSubjects.filter((element) => {
    if(element.toString() !== subject._id.toString()) {
      return element;
    }
  })

  user.favoriteSubjects = newFavorites;
  await user.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Subject removed from favorites."
    })
})

// Admin Functions ---------------------------------------------------------------------------------------------------------------

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res
    .status(200)
    .json({
      success: true,
      users
    })
})

export const changeUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params._id);

  console.log(user);

  if(!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  if(user.role === "admin") {
    return next(new ErrorHandler(`${user.role} role can be changed from DB only.`, 400))
  }

  if(user.role === "user") user.role = "moderator"
  else if(user.role === "moderator") user.role = "user"
  
  await user.save();

  console.log(user);

  res
    .status(200)
    .json({
      success: true,
      message: "Role updated successfully!"
    })
})

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params);

  if(!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if(user.avatar.imgName) {
    deleteFile(user.avatar.imgName);
  }

  await user.delete();

  res
    .status(200)
    .json({
      success: true,
      message: "User deleted successfully."
    })
})

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  stats[0].users = await User.countDocuments();

  await stats[0].save();
})