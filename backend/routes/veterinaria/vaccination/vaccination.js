const express = require("express");
const router = express.Router();

const vaccinationController = require("../../../controllers/vaccination/vaccinationController");
const Secure = require("../../../middlewares/secure/secure");



router.post("/createVaccination",Secure(['masterAdmin','customerService']), vaccinationController.createVaccination);
router.put("/updateVaccination/:id",Secure(['masterAdmin','customerService']), vaccinationController.updateVaccination);
router.post("/createVaccinationRecord/:id",Secure(['masterAdmin','customerService']), vaccinationController.createVaccineRecord);
router.put("/updateVaccinationStatus/:id",Secure(['masterAdmin','customerService']), vaccinationController.updateVaccinationStatus);
router.put("/updateVaccinationValidity/:id",Secure(['masterAdmin','customerService']), vaccinationController.updateVaccinationValidity);
router.delete("/deleteVaccinationRecord/:id",Secure(['masterAdmin','customerService']), vaccinationController.deleteVaccinationRecord);
router.get("/petVaccination/:id",Secure(['masterAdmin','customerService','user']), vaccinationController.petVaccination);
router.get("/vaccinationList",Secure(['masterAdmin','customerService']), vaccinationController.vaccinationList);
router.get("/vaccinationById/:vaccineId",Secure(['masterAdmin','customerService']), vaccinationController.vaccinationsById);
module.exports = router;