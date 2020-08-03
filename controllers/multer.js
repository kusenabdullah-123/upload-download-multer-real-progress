const multer = require("multer");
const path = require("path");
// config storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// config upload
const upload = multer({
  storage: storage,
}).single("file");

module.exports = upload;
