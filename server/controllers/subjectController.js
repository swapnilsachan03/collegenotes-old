import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Notes } from "../models/notes.js";
import { Stats } from "../models/stats.js";
import { Subject } from "../models/subject.js"
import ErrorHandler from "../utils/errorHandler.js";
import { deleteFile, generateFileName, getObjectSignedUrl, uploadFile } from "../utils/s3.js";

// User Functions ----------------------------------------------------------------------------------------------------------------

export const getAllSubjects = catchAsyncError(async (req, res, next) => {
  const name = req.query.search || "";
  const degree = req.query.degree || "";
  const year = req.query.year || "";

  const query = {
    title: {
      $regex: name,
      $options: "i"
    },
    degree: {
      $regex: degree,
      $options: "i",
    },
    year: {
      $regex: year,
      $options: "i",
    }
  }

  const subjects = await Subject.find(query).select(["-seoDescription", "-seoKeywords", "-lastUpdated", "-notes", "-poster", "-beforeNotesContent", "-afterNotesContent"]).limit(15);

  subjects.map(async (subject) => {
    subject.icon.url = await getObjectSignedUrl(subject.icon.fileName);
    await subject.save();
  })

  res.status(200).json({
    success: true,
    subjects
  })
})

export const getSubjectContent = catchAsyncError(async (req, res, next) => {
  const subject = await Subject.findOne({id: req.params.id}).populate("notes");
  
  if(!subject) {
    return next(new ErrorHandler("Invalid subject ID!", 404))
  }
  
  subject.poster.url = await getObjectSignedUrl(subject.poster.fileName);
  subject.icon.url = await getObjectSignedUrl(subject.icon.fileName);
  subject.views += 1;
  await subject.save();

  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  stats[0].views += 1;
  await stats[0].save();

  res
    .status(200)
    .json({
      success: true,
      subject
    })
})

export const getNotes = catchAsyncError(async (req, res, next) => {
  const notes = await Notes.findOne({id: req.params.id});
  
  if(!notes) {
    return next(new ErrorHandler("Invalid notes ID.", 404))
  }
  
  notes.document.url = await getObjectSignedUrl(notes.document.documentKey);
  notes.views += 1;
  await notes.save();
  
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  stats[0].views += 1;
  await stats[0].save();

  res
    .status(200)
    .json({
      success: true,
      notes
    })
})

// Admin Functions ---------------------------------------------------------------------------------------------------------------

export const addSubject = catchAsyncError(async (req, res, next) => {
  const { title, description, seoDescription, seoKeywords, id, degree, year, beforeNotesContent, afterNotesContent } = req.body;
  const poster = req.files.poster[0];
  const icon = req.files.icon[0];
  
  if(!title || !description || !seoDescription || !seoKeywords || !id || !degree || !year || !beforeNotesContent || !afterNotesContent || !poster || !icon) {
    return next(new ErrorHandler(
      "Please enter all fields", 400
    ))
  }

  var posterKey = generateFileName(poster.originalname);
  await uploadFile(poster.buffer, posterKey, poster.mimetype);

  var iconKey = generateFileName(icon.originalname);
  await uploadFile(icon.buffer, iconKey, icon.mimetype);

  await Subject.create({
    title,
    description,
    seoDescription,
    seoKeywords,
    id,
    beforeNotesContent,
    afterNotesContent,
    degree,
    year,
    poster: {
      fileName: posterKey
    },
    icon: {
      fileName: iconKey
    },
  })

  res
    .status(200)
    .json({
      success: true,
      message: "Subject created successfully, you can add notes now!"
    })
})

export const addNotes = catchAsyncError(async (req, res, next) => {
  const subject = await Subject.findById(req.params._id);
  const { title, description, id, contributor, contributorSocial, institution } = req.body;
  const document = req.file;

  if(!subject) {
    return next(new ErrorHandler(
      "Subject not found or invalid subject ID.", 404
    ))
  }

  if(!title || !id || !institution || !document) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  var documentName = generateFileName(document.originalname);
  await uploadFile(document.buffer, documentName, document.mimetype);

  await Notes.create ({
    title,
    subject: subject.title,
    description,
    id,
    contributor,
    contributorSocial,
    institution,
    document: {
      documentKey: documentName
    },
  })
  .then(async (result) => {
    subject.notes.push(result._id);
    subject.numOfNotes = subject.notes.length;
    await subject.save();
  })

  res
    .status(200)
    .json({
      success: true,
      message: "Notes uploaded successfully!"
    })
})

export const deleteNotes = catchAsyncError(async (req, res, next) => {
  const { subjectID, notesID } = req.query;

  const subject = await Subject.findById(subjectID);
  const notes = await Notes.findById(notesID);

  if(!notes || !subject) {
    return next(new ErrorHandler("Either notes or subject not found."))
  }

  await deleteFile(notes.document.documentKey);

  const notesArray = subject.notes.filter((element) => {
    if(element.toString() !== notesID) {
      return element;
    }
  })

  await notes.delete();

  subject.notes = notesArray;
  subject.numOfNotes = notesArray.length;
  await subject.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Notes deleted successfully!"
    })
})

export const updateSubject = catchAsyncError(async (req, res, next) => {
  const subject = await Subject.findById(req.params._id);
  const { title, description, seoDescription, seoKeywords, id, degree, year, beforeNotesContent, afterNotesContent } = req.body;
  
  const poster = req.files.poster ? req.files.poster[0] : null;
  const icon = req.files.icon ? req.files.icon[0] : null;

  if(!subject) {
    return next(new ErrorHandler(
      "Subject not found or invalid Subject ID", 400
    ))
  }

  if(!title || !description || !seoDescription || !seoKeywords || !id || !degree || !year || !beforeNotesContent || !afterNotesContent) {
    return next(new ErrorHandler(
      "Please enter all fields", 400
    ))
  }

  if(poster) {
    await deleteFile(subject.poster.fileName);
    var posterKey = generateFileName(poster.originalname);
    await uploadFile(poster.buffer, posterKey, poster.mimetype);
    subject.poster.fileName = posterKey;
  }

  if(icon) {
    await deleteFile(subject.icon.fileName);
    var iconKey = generateFileName(icon.originalname);
    await uploadFile(icon.buffer, iconKey, icon.mimetype);
    subject.icon.fileName = iconKey;
  }

  subject.title = title;
  subject.description = description;
  subject.seoDescription = seoDescription;
  subject.seoKeywords = seoKeywords;
  subject.id = id;
  subject.degree = degree;
  subject.year = year;
  subject.beforeNotesContent = beforeNotesContent;
  subject.afterNotesContent = afterNotesContent;

  await subject.save();

  res
    .status(200)
    .json({
      success: true,
      message: "Subject updated successfully."
    })
})

export const deleteSubject = catchAsyncError(async (req, res, next) => {
  const subject = await Subject.findById(req.params._id);

  if(!subject) {
    return next(new ErrorHandler(
      "Subject not found or invalid Subject ID", 400
    ))
  }

  await deleteFile(subject.poster.fileName);
  await deleteFile(subject.icon.fileName);

  subject.notes.map(async (element) => {
    var notes = await Notes.findById(element);
    await deleteFile(notes.document.documentKey);
    await notes.delete();
  })

  await subject.delete();

  res
    .status(200)
    .json({
      success: true,
      message: "Subject deleted successfully."
    })
})

Subject.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  stats[0].totalSubejcts = await Subject.countDocuments();
  stats[0].createdAt = Date.now();

  await stats[0].save();
})

Notes.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  stats[0].totalNotes = await Notes.countDocuments();
  stats[0].createdAt = Date.now();

  await stats[0].save();
})