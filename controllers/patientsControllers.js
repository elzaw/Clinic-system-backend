const { default: mongoose } = require("mongoose");
const { Patient } = require("../models/patientModel");
const { Doctors } = require("../models/doctorsModel");
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

const getAllPatientsByDoctorId = async (req, res) => {
  try {
    const { doctor } = req.params; // Extract the doctor ID from the request parameters

    // Find patients associated with the doctor ID
    const patients = await Patient.find({ doctor });

    res.status(200).json(patients); // Send the patients as a response
  } catch (error) {
    console.error("Error fetching patients:", error); // Log the actual error
    res.status(500).json({ message: "Server Error", error: error.message }); // Send the error message in the response
  }
};

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
  getAllPatientsByDoctorId,
};
