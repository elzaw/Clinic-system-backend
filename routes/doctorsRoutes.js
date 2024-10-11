const express = require("express");
const router = express.Router();

const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
  loginDoctor,
} = require("../controllers/doctorsController");

router.route("/").post(createDoctor).get(getAllDoctors);

router
  .route("/:id")
  .patch(updateDoctorById)
  .delete(deleteDoctorById)
  .get(getDoctorById);

router.route("/login").post(loginDoctor);

module.exports = router;
