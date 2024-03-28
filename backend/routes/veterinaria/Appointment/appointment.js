const express = require("express");
const router = express.Router();
const Secure = require("../../../middlewares/secure/secure");
const uploadDoc = require("../../../middlewares/veterinaria/appointment");
const appointmentController = require("../../../controllers/Appointment/appointmentController");
router.get("/appointmentExcelFile", Secure(["masterAdmin"]), appointmentController.appointmentExcelFile);
router.get("/appointmentsList", Secure(["masterAdmin", "customerService", "user"]), appointmentController.updateAppointmentsStatus);
router.get("/allAppointments", Secure(["customerService", "masterAdmin"]), appointmentController.getAllAppointments);
router.get("/singleAppointment/:id", Secure(["customerService", "masterAdmin", "user"]), appointmentController.getSingleAppointment);
router.get("/dateWiseAppointments", Secure(["customerService", "masterAdmin"]), appointmentController.dateWiseAppointment);
router.get("/appointmentFilter", Secure(["customerService", "masterAdmin"]), appointmentController.appointmentFilter);
router.get("/appointmentsOfDoctor/:veterinarianId", Secure(["customerService", "masterAdmin", "user"]), appointmentController.AppointmentsOfDoctor);
router.post("/scheduleAppointment", Secure(["customerService", "masterAdmin", "user"]), appointmentController.createAppointment);
router.put("/updateAppointment/:id", Secure(["customerService", "masterAdmin", "user"]), appointmentController.updateAppointment);
router.put(
  "/registerDiagnostic/:id",
  uploadDoc.array("documentation", 10),
  Secure(["customerService", "masterAdmin", "user"]),
  appointmentController.registerDiagnostic,
);
router.delete("/appointmentRemove/:id", Secure(["masterAdmin", "customerService"]), appointmentController.deleteAppointmentRecord);
module.exports = router;
