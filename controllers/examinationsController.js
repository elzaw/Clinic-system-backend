const { Examinations } = require("../models/examinationsModel");
const asyncHandler = require("express-async-handler");

const createExamination = asyncHandler(async (req, res) => {
  try {
    const examinationData = req.body;
    // Calculate remaining
    examinationData.remaining =
      examinationData.examinationFee - examinationData.paid;
    const newExamination = await Examinations.create(examinationData);
    res.status(201).json(newExamination);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getAllExaminations = asyncHandler(async (req, res) => {
  try {
    const examinations = await Examinations.find({});
    res.status(200).json(examinations);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getExaminationsByDate = asyncHandler(async (req, res) => {
  try {
    const { date } = req.query; // Assuming date is passed as a query parameter in 'YYYY-MM-DD' format

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    // Convert date to start and end of the day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find examinations within this date range
    const examinations = await Examinations.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("patient"); // Populate patient details if needed

    res.status(200).json(examinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching examinations", error });
  }
});

const getExaminationById = asyncHandler(async (req, res) => {
  const examinationId = req.params.id;
  try {
    const examination = await Examinations.findById(examinationId);
    res.status(200).json(examination);
  } catch (err) {
    res.status(500).json(err);
  }
});

const updateExamination = asyncHandler(async (req, res) => {
  const examinationId = req.params.id;
  const examinationData = req.body;
  try {
    // Calculate remaining
    examinationData.remaining =
      examinationData.examinationFee - examinationData.paid;
    const examination = await Examinations.findByIdAndUpdate(
      examinationId,
      examinationData,
      { new: true }
    );
    res.status(200).json(examination);
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteExamination = asyncHandler(async (req, res) => {
  const examinationId = req.params.id;
  try {
    const examination = await Examinations.findByIdAndDelete(examinationId);
    res.status(200).json(examination);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getExaminationsByPatientId = asyncHandler(async (req, res) => {
  const patientId = req.params.id;
  try {
    const examinations = await Examinations.find({ patient: patientId });
    res.status(200).json(examinations);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = {
  createExamination,
  getAllExaminations,
  getExaminationById,
  updateExamination,
  deleteExamination,
  getExaminationsByPatientId,
  getExaminationsByDate,
};
