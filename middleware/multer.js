import multer from "multer";
const storage = multer.diskStorage({
  destination: "./uploadedFiles/",
  filename: function (req, file, cb) {
    // console.log(req);
    // const version = req.body.version;
    // const title = req.body.title;
    // const name = "Version-" + version + title;
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
