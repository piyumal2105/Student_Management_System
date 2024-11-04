import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// To handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage configuration for profile pictures
const profilePictureStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/profilePictures/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Storage configuration for homework uploads
const homeworkStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/homework/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: File type not allowed!");
  }
};

// Upload handlers
export const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  fileFilter,
});

export const uploadHomework = multer({
  storage: homeworkStorage,
  fileFilter,
});
