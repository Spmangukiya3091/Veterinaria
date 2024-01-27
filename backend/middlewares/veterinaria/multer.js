const multer = require("multer");
const path = require("path");

const ProfileStorage = multer.diskStorage({
  destination: "./public/veterinaria/profile",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const profileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/") && (file.originalname.endsWith(".png") || file.originalname.endsWith(".jpg"))) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only PNG and JPG images are allowed."));
  }
};
const upload = multer({
  storage: ProfileStorage,
  limits: {
    fileSize: 52428800,
  },
  fileFilter: profileFilter,
});

module.exports = upload;
