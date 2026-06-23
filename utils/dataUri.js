import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDataUri = (file) => {
  // 1. File ka extension nikaalna (e.g., .png, .jpg)
  const extName = path.extname(file.originalname).toString();
  
  // 2. File buffer ko DataURI format mein convert karna
  return parser.format(extName, file.buffer).content;
};

export default getDataUri;