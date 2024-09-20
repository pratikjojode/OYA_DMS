const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsControler,
  getAllNursesCOntroler,
  getCurrentUser,
  getAdimctrl,
  getAdminCtrl,
} = require("../controller/adminController");
const router = express.Router();

// get the users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// get method
router.get("/getAllDoctors", authMiddleware, getAllDoctorsControler);

// get all nurses
router.get("/getAllnurses", authMiddleware, getAllNursesCOntroler);

router.get("/current/:_id", authMiddleware, getCurrentUser);

router.get("/:id", authMiddleware, getAdminCtrl);

module.exports = router;
