const express = require("express");
const router = express.Router();

const paymentController = require("../../../controllers/Payment/paymentController");
const Secure = require("../../../middlewares/secure/secure");
router.get("/paymentExcelSheet",Secure(['masterAdmin']), paymentController.paymentExcelFile)
router.get("/paymentsList",Secure(['masterAdmin','customerService']), paymentController.getAllPayments)
router.get("/singlePayment/:id",Secure(['masterAdmin','customerService']), paymentController.getSinglePayment)
router.get("/paymentFilter",Secure(['masterAdmin','customerService']), paymentController.paymentFilter)
router.post("/paymentRegistration",Secure(['masterAdmin','customerService']), paymentController.registerPayment);
router.put("/paymentUpdate/:id",Secure(['masterAdmin','customerService']), paymentController.updatePayment);
router.delete("/paymentRemove/:id",Secure(['masterAdmin','customerService']), paymentController.deletePaymentRecord);
module.exports = router;