const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const equipmentController = require("../controller/equipmentController");

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
router.post("/add", upload.single("image"), equipmentController.addEquipment);
router.get("/", equipmentController.getAllEquipment);
router.put("/:id", upload.single("image"), equipmentController.updateEquipment);
router.delete("/:id", equipmentController.deleteEquipment);

module.exports = router;
