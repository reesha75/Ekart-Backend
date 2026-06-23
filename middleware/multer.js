import multer from "multer";

const storage = multer.memoryStorage();

// Single Upload
export const singleUpload = multer({
  storage,
}).single("file");

// Multiple Upload — field name must match what frontend sends ("images")
export const multipleUpload = multer({
  storage,
}).array("images", 5);