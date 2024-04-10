const multer = require("multer");
const path = require("path");

const ProfileStorage = multer.diskStorage({
  destination: "./public/profile",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const profileFilter = function (req, file, cb) {

  if (
    file.mimetype.startsWith("image/") &&
    (file.originalname.endsWith(".png") || file.originalname.endsWith(".jpg") || file.originalname.endsWith(".jpeg"))
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only PNG and JPG images are allowed."));
  }
};
const upload = multer({
  storage: ProfileStorage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: profileFilter,
});


module.exports = upload