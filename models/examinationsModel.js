const mongoose = require("mongoose");

const examinationsSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    examinationFee: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
      required: true,
    },
    remaining: {
      type: Number,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    notes: { type: String },
    date: { type: Date, required: true },
    nextVisit: { type: Date },
  },
  { collection: "Examinations" }
);

const Examinations = mongoose.model("Examinations", examinationsSchema);

module.exports = { Examinations };
