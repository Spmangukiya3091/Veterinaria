const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/veterinaria/multer");
const usersController = require("../../../controllers/Admin/usersController");
const Secure = require("../../../middlewares/secure/secure");

router.post("/userRegistration", upload.single("profile"), Secure(["masterAdmin"]), usersController.userRegister);
router.post("/userLogins", usersController.userLogin);
router.post("/verificationLink", usersController.sendForgetPasswordLink);
router.put("/updatePassword", usersController.updatePassword);
router.post("/sendUserPassword/:id", Secure(["masterAdmin"]), usersController.sendPassword);
router.put("/updateProfile/:id", upload.single("profile"), Secure(["customerService", "masterAdmin"]), usersController.updateUserProfile);
router.post("/changePassword/:id", usersController.changeUserPassword);
router.delete("/deleteUserProfile/:id", Secure(["masterAdmin"]), usersController.deleteUserProfile);
router.get("/userList", Secure(["customerService", "masterAdmin"]), usersController.getAllUsersData);
router.get("/userFilter", Secure(["customerService", "masterAdmin"]), usersController.userFilter);
router.get("/loginUserDetail/:id", usersController.getLoginUserDetail);
module.exports = router;
