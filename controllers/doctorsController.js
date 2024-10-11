const { Doctors } = require("../models/doctorsModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createDoctor = asyncHandler(async (req, res) => {
  try {
    const doctorData = req.body;
    const newDoctor = await Doctors.create(doctorData);
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: "Could not create doctor", details: error });
  }
});

const loginDoctor = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    const doctor = await Doctors.findOne({ username });
    if (!doctor) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Could not log in doctor", details: error });
  }
});

const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctors.find({});
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctors.findById(doctorId);
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

const updateDoctorById = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;
  const doctorData = req.body;
  try {
    const doctor = await Doctors.findByIdAndUpdate(doctorId, doctorData, {
      new: true,
    });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

const deleteDoctorById = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctors.findByIdAndDelete(doctorId);
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
  loginDoctor,
};
