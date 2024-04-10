const express = require("express");
const router = express.Router();
const Secure = require("../../../middlewares/secure/secure")
const ownerController = require("../../../controllers/Veterinaria/Owner/ownerController")
router.get("/ownerExcelFile",Secure(['masterAdmin']), ownerController.ownerExcelFile)
router.get("/petAppointmentsOfOwner/:id",Secure(['customerService','masterAdmin','user']) ,  ownerController.petAppointmentDataOfOwner)
router.get("/ownersList",Secure(['customerService','masterAdmin','user']) , ownerController.getAllOwners)
router.get("/singleOwner/:id",Secure(['masterAdmin','customerService',' ']), ownerController.getSingleOwner)
router.get("/petListByOwner/:id",Secure(['masterAdmin','customerService','user']), ownerController.getAllPetsByOwner)
router.get("/ownerFilter",Secure(['masterAdmin','customerService']), ownerController.ownerFilter)
router.post("/createOwner",Secure(['masterAdmin','customerService']), ownerController.createOwner);
router.put("/updateOwner/:id",Secure(['masterAdmin','customerService']), ownerController.updateOwner);
router.delete("/ownerRemove/:id",Secure(['masterAdmin','customerService']), ownerController.deleteOwnerRecord);
module.exports = router;