const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { collection: "Patient" }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient };
