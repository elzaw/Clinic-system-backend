const { Patient } = require("../models/patientModel");
const asyncHandler = require("express-async-handler");

// Create (Insert) Operation
const createPatient = asyncHandler(async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = await Patient.create(patientData);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: "Could not create patient", details: error });
  }
});

// Read (Retrieve) Operation
const getAllPatients = asyncHandler(async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not retrieve patients", details: error });
  }
});

// Read (Retrieve) Operation - Get patient by ID
const getPatientById = asyncHandler(async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not retrieve patient", details: error });
  }
});

// Update Operation
const updatePatient = asyncHandler(async (req, res) => {
  try {
    const patientId = req.params.id;
    const updateData = req.body;
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updateData,
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: "Could not update patient", details: error });
  }
});

// Delete Operation
const deletePatient = asyncHandler(async (req, res) => {
  try {
    const patientId = req.params.id;
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(deletedPatient);
  } catch (error) {
    res.status(500).json({ error: "Could not delete patient", details: error });
  }
});

module.exports = {
  createPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
  getPatientById,
};
