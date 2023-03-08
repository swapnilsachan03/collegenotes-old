// Add maybe a donations record from the user.

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },

  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },

  avatar: {
    imgName: {
      type: String
    },
    url: {
      type: String,
      default: "temp_url",
    },
  },

  favoriteSubjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],

  bookmarkedNotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: String,
});

schema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
})

schema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

schema.methods.getJWTToken = function() {
  return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
}

schema.methods.getResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");
  
  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex")
  
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
}

export const User = mongoose.model("User", schema);