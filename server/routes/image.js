//multer used for image storage in server

module.exports = (app) => {
  const image = require("../controllers/image");

  const multer = require("multer");

  const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./storage");
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}.png`);
    },
  });

  const upload = multer({ storage: fileStorageEngine });

  // Create a new unit
  app.post("/api/image", upload.single("image"), image.create);

  // Retrieve all propertys
  app.get("/api/image", image.findAll);
};
