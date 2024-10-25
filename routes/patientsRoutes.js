const express = require("express");
const router = express.Router();

const {
  createPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
  getPatientById,
  getAllPatientsByDoctorId,
} = require("../controllers/patientsControllers");

router.route("/doctor/:doctor").get(getAllPatientsByDoctorId);
router.route("/").post(createPatient).get(getAllPatients);

router
  .route("/:id")
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

module.exports = router;
