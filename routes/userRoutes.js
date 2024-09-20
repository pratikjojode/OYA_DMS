const express = require("express");
const {
  loginController,
  regsiterController,
  authCtrl,
  applyDocController,
  applyNurseController,
  getallNotificationController,
  deleteallNotificationController,
  getUserDoctorCOntroller,
  getSingleUserCtr,
  // deleteAllNurseNotifications,
  // markAllNurseNotificationsRead,
  // getNurseNotifications,
} = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Router object
const router = express.Router();

// Login route || POST
router.post("/login", loginController);

// Register route || POST
router.post("/register", regsiterController);

// Auth || POST
router.post("/getUserData", authMiddleware, authCtrl);

router.get("/getUser/:id", authMiddleware, getSingleUserCtr);

// Apply doctor with image upload || POST
router.post("/apply-doctor", authMiddleware, applyDocController);

// route for nurese
router.post("/apply-nurses", authMiddleware, applyNurseController);

// notifation for doctors
router.post(
  "/get-all-notification",
  authMiddleware,
  getallNotificationController
);
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteallNotificationController
);

// get the doc data
router.get("/getuserDoctor", authMiddleware, getUserDoctorCOntroller);

// // for nurses
// // Route to get all nurse notifications
// router.post(
//   "/get-all-nurse-notifications",
//   authMiddleware,
//   getNurseNotifications
// );

// // Route to mark all nurse notifications as read
// router.post(
//   "/mark-all-nurse-notifications-read",
//   authMiddleware,
//   markAllNurseNotificationsRead
// );

// // Route to delete all nurse notifications
// router.post(
//   "/delete-all-nurse-notifications",
//   authMiddleware,
//   deleteAllNurseNotifications
// );
module.exports = router;
