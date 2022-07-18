const multer = require("multer");
const path = require('path')

const file_type = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    const fileT = file_type[file.mimetype];
    let err = new Error("wrong image type");
    if (fileT) {
      err = null;
    }
    cd(err, "Images/Mediator");
  },
  filename: (req, file, cd) => {
    const fileT = file_type[file.mimetype];
    const fileName = `${file.originalname
      }`;
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize:	5242880
  }
})