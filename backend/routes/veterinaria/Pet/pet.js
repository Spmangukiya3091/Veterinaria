const express = require("express");
const router = express.Router();

const petController = require("../../../controllers/Veterinaria/Pet/petController");
const Secure = require("../../../middlewares/secure/secure");
router.get("/petExcelSheet",Secure(['masterAdmin']), petController.petExcelFile)
router.get("/petSummaryPdf/:id",Secure(['masterAdmin','customerService']), petController.petSummaryPdf)
router.get("/petAppointment/:id",Secure(['masterAdmin','customerService','user']), petController.appointmentDataOfPet)
router.get("/petsList",Secure(['masterAdmin','customerService','user']), petController.getAllPets)
router.get("/singlePet/:id",Secure(['masterAdmin','customerService','user']), petController.getSinglePet)
router.get("/petFilter",Secure(['masterAdmin','customerService','user']), petController.petFilter)
router.post("/createPet",Secure(['masterAdmin','customerService']), petController.createPet);
router.put("/petUpdate/:id",Secure(['masterAdmin','customerService']), petController.updatePet);
router.delete("/petRemove/:id",Secure(['masterAdmin','customerService']), petController.deletePetRecord);
module.exports = router;