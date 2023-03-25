import express from "express";
import { addNotes, addSubject, deleteNotes, deleteSubject, getAllSubjects, getNotes, getSubjectContent, updateSubject } from "../controllers/subjectController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { multiUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// User Routes -------------------------------------------------------------------------------------------------------------------

router
  .route("/getAllSubjects")
  .get(getAllSubjects);

router
  .route("/subject/:id")
  .get(getSubjectContent);

router
  .route("/notes/:id")
  .get(getNotes);

// Admin Routes ------------------------------------------------------------------------------------------------------------------

router
  .route("/addSubject")
  .post(isAuthenticated, authorizeAdmin, multiUpload, addSubject);

router
  .route("/subject/:_id")
  .put(isAuthenticated, authorizeAdmin, multiUpload, updateSubject)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addNotes)
  .delete(isAuthenticated, authorizeAdmin, deleteSubject);

router
  .route("/notes")
  .delete(isAuthenticated, authorizeAdmin, deleteNotes)

export default router;