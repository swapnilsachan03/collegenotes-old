import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");
export const multiUpload = multer({ storage }).fields([
  {name: "poster", maxCount: "1"},
  {name: "icon", maxCount: "1"}
]);