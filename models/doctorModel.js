const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number  is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    experience: {
      type: String,
      required: [true, "Exp is required"],
    },
    consultFees: {
      type: Number,
      required: [true, "fees is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timing: {
      type: Object,
      required: [true, "time is required"],
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("Doctors", doctorSchema);
module.exports = doctorModel;
