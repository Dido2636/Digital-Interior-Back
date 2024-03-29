import multer from "multer";
import path from "path";

const mediaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadMedia = multer({ storage: mediaStorage });

export { uploadMedia };
