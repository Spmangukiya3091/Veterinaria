const express = require("express");
const router = express.Router();
const uploadAvatar = require("../../../middlewares/veterinaria/veterinarian");
const specialityController = require("../../../controllers/Veterinaria/Veterinarian/specialityController");
const veterinarianController = require("../../../controllers/Veterinaria/Veterinarian/veterinarian");
const Secure = require("../../../middlewares/secure/secure");

// speciality
router.get("/specialityList", Secure(['masterAdmin']), specialityController.getAllSpecialities);
router.get("/veterinarianBySpeciality", Secure(['masterAdmin']), specialityController.getVeterinariansBySpeciality);
router.get("/singleSpeciality/:id", Secure(['masterAdmin']), specialityController.getSingleSpeciality);
router.post("/createSpeciality", Secure(['masterAdmin']), specialityController.createSpeciality);
router.put("/UpdateSpeciality/:id", Secure(['masterAdmin']), specialityController.updateSpeciality);
router.delete("/specialityRemove/:id", Secure(['masterAdmin']), specialityController.deleteSpeciality);





// veterinarian
router.get("/veterinariansList", Secure(['customerService', 'masterAdmin', 'user']), veterinarianController.getAllVeterinarians);
router.get(
  "/veterinariansAppointmentList", Secure(['masterAdmin', 'customerService']),
  veterinarianController.appointmentData
);
router.get(
  "/singleVeterinarianAppointment/:id", Secure(['masterAdmin', 'customerService', 'user']),
  veterinarianController.appointmentDataBySingleVeterinarian
);
router.get(
  "/singleVeterinarian/:id", Secure(['masterAdmin', 'customerService', 'user']),
  veterinarianController.getSingleVeterinarians
);
router.get(
  "/veterinariansExcelSheet/:id", Secure(['masterAdmin']),
  veterinarianController.veterinarianExcelFile
);
router.get("/veterinariansFilter", Secure(['masterAdmin']), veterinarianController.veterinarianFilter);
router.post(
  "/createVeterinarian", Secure(['masterAdmin']),
  uploadAvatar.single("avatar"),
  veterinarianController.createVeterinarian
);
router.put(
  "/UpdateVeterinarian/:id", uploadAvatar.single("avatar"), Secure(['masterAdmin']),
  veterinarianController.updateVeterinarian
);
router.delete(
  "/veterinarianRemove/:id", Secure(['masterAdmin']),
  veterinarianController.deleteVeterinarian
);



// vets

router.get("/vets/ownersByVeterinarian/:veterinarianId", Secure(['user']), veterinarianController.ownersByVeterinarian);
router.get("/vets/petsByVeterinarian/:veterinarianId", Secure(['user']), veterinarianController.petsByVeterinarian);

module.exports = router;
