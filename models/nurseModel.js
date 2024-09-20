const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    notifications: {
      type: Array,
      default: [],
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    image: {
      type: String, // Path to the image file
      required: false, // Optional
    },
  },
  {
    timestamps: true,
  }
);

const Nurse = mongoose.model("Nurse", nurseSchema);
module.exports = Nurse;
