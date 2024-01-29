const express = require("express");
const router = express.Router();

const productController = require("../../../controllers/Products/productController");
const categoryController = require("../../../controllers/Products/categoryController");
const Secure = require("../../../middlewares/secure/secure");

// category
router.get("/categoriesList", Secure(["masterAdmin", "customerService", "user"]), categoryController.getAllCategories);

router.get("/singleCategory/:id", Secure(["masterAdmin", "customerService"]), categoryController.getSingleCategory);
router.get("/productCount", Secure(["masterAdmin", "customerService", "user"]), categoryController.getTotalProductsByCategory);
router.post("/createCategory", Secure(["masterAdmin", "customerService"]), categoryController.createCategory);
router.put("/UpdateCategory/:id", Secure(["masterAdmin", "customerService"]), categoryController.updateCategory);
router.delete("/categoryRemove/:id", Secure(["masterAdmin", "customerService"]), categoryController.deleteCategory);

// product
router.get("/productsList", Secure(["masterAdmin", "customerService", "user"]), productController.getAllProducts);
router.get("/singleProduct/:id", Secure(["masterAdmin", "customerService", "user"]), productController.getSingleProduct);
router.get("/productHistory/:id", Secure(["masterAdmin", "customerService", "user"]), productController.getProductHistory);
router.get("/productExcelSheet", Secure(["masterAdmin"]), productController.productExcelFile);
router.get("/productFilter", Secure(["masterAdmin", "customerService", "user"]), productController.productFilter);
router.post("/createProduct", Secure(["masterAdmin", "customerService"]), productController.createProduct);
router.put("/UpdateProduct/:id", Secure(["masterAdmin", "customerService"]), productController.updateProduct);
router.put("/UpdateStock/:id", Secure(["masterAdmin", "customerService"]), productController.updateProductStock);
router.delete("/productRemove/:id", Secure(["masterAdmin", "customerService"]), productController.deleteProduct);

module.exports = router;
