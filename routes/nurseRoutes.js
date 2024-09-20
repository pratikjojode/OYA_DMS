const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const nurseController = require("../controller/nurseController");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), nurseController.addNurse);
router.get("/", nurseController.getAllNurses);
router.put("/update/:id", upload.single("image"), nurseController.updateNurse);
router.delete("/delete/:id", nurseController.deleteNurse);

module.exports = router;
