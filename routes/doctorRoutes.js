const express = require("express");
const {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
} = require("../controller/doctorController");
const upload = require("../middlewares/upload"); // Middleware for image upload

const router = express.Router();

router.post("/create", upload.single("image"), createDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.get("/:id", getDoctorById); // Get a single doctor by ID
router.put("/update/:id", upload.single("image"), updateDoctor);
router.delete("/delete/:id", deleteDoctor);

module.exports = router;
