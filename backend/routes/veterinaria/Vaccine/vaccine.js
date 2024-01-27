const express = require("express");
const router = express.Router();

const vaccineController = require("../../../controllers/Veterinaria/Vaccine/vaccineController");
const Secure = require("../../../middlewares/secure/secure");

router.get("/vaccineList",Secure(['masterAdmin','customerService']), vaccineController.getAllVaccines)
router.get("/singleVaccine/:id",Secure(['masterAdmin','customerService']), vaccineController.getSingleVaccine)
router.get("/vaccineExcelSheet",Secure(['masterAdmin','customerService']), vaccineController.vaccineExcelFile)
router.get("/vaccineFilter",Secure(['masterAdmin','customerService']), vaccineController.vaccineFilter)
router.post("/createVaccine",Secure(['masterAdmin','customerService']), vaccineController.createVaccine);
router.put("/updateVaccine/:id",Secure(['masterAdmin','customerService']), vaccineController.updateVaccine);
router.delete("/vaccineRemove/:id",Secure(['masterAdmin','customerService']), vaccineController.deleteVaccine);
module.exports = router;