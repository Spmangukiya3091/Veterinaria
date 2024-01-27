const { Op } = require("sequelize");
const Database = require("../../../config/connection");
const Product = Database.product;
const History = Database.history;
const Admin = Database.user;
const jwt = require("jsonwebtoken")
const ExcelJS = require("exceljs");
const createProduct = async (req, res) => {
  try {
    const product = {
      product: req.body.product,
      categoryId: req.body.categoryId,
      category: req.body.category === "" || !req.body.category ? null : req.body.category,
      brand: req.body.brand,
      composition: req.body.composition === "" || !req.body.composition ? null : req.body.composition,
      stock: req.body.stock,
      status: req.body.status,
      price: req.body.price,
      presentation: req.body.presentation,
      sku: req.body.sku,
      laboratory: req.body.laboratory === "" || !req.body.laboratory ? null : req.body.laboratory,
      description: req.body.description === "" || !req.body.description ? null : req.body.description,
    };
    if (product.product === "" || product.product === null) {
      res.status(201).send({
        message: "product is required",
      });
    } else if (product.brand === "" || product.brand === null) {
      res.status(201).send({
        message: "brand is required",
      });
    } else if (product.stock === "" || product.stock === null) {
      res.status(201).send({
        message: "stock is required",
      });
    } else if (product.sku === "" || product.sku === null) {
      res.status(201).send({
        message: "sku is required",
      });
    } else if (product.status === "" || product.status === null) {
      res.status(201).send({
        message: "status is required",
      });
    } else {
      Product.create(product).then((result) => {
        res.status(201).json({
          message: "product created",
          result: result,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error product creation",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findOne({ where: { id: id } });

    const product = {
      product: req.body.product,
      category: req.body.category,
      brand: req.body.brand,
      composition: req.body.composition,
      stock: req.body.stock,
      status: req.body.status,
      price: req.body.price,
      presentation: req.body.presentation,
      sku: req.body.sku,
      laboratory: req.body.laboratory,
      description: req.body.description,
      reason: "",
    };

    if (productExist) {
      await Product.update(product, { where: { id: id } });
      res.status(200).send({
        message: "product updated successfully",
      });
    } else {
      res.status(404).send({
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating category",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ where: { id: id } });
  const { pass, email } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "hello$%#@!ADMIN___++");
  const user = await Admin.findOne({
    where: { email: email },
  });
  if (pass !== user.password) {
    return res.status(400).send({
      message: "password not match",
      success: false,
    });
  }
  if (decoded.role !== user.role) {
    return res.status(400).send({
     message: "Not authorized",
     success: false,
   });
 }
  if (product?.id === id) {
    await Product.destroy({ where: { id: id } });
    return res.status(200).send({
      message: "product deleted successfully",
      success: true,
    });
  } else {
    return res.status(404).send({
      message: "product record not found",
      success: false,
    });
  }
};

const getAllProducts = async (req, res) => {
  const productList = await Product.findAll({});
  res.status(200).send({
    message: "productsList",
    productList,
  });
};
const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findAll({ where: { id: id } });
  res.status(200).send({
    message: "products",
    product,
  });
};

const updateProductStock = async (req, res) => {
  const id = req.params.id;
  const products = await Product.findOne({
    where: { id: id },
  });
  const product = {
    stock: products.stock + req.body.stock,
    reason: req.body.reason,
    status: products.stock === 0 ? "active" : "inactive",
  };
  const history = {
    productId: products.id,
    stock: req.body.stock,
    reason: req.body.reason,
  };
  if (products) {
    await History.create(history);
    await Product.update(product, { where: { id: id } });
    res.status(200).send({
      message: "stock updated successfully",
    });
  } else {
    res.status(200).send({
      message: "product not found",
    });
  }
};

const getProductHistory = async (req,res) => {
  const id = req.params.id;
  const productHistory = await History.findAll({ where: { productId: id }, order: [['createdAt', 'DESC']], });
  res.status(200).send({
    message: "productHistory",
    productHistory,
  });
};
const productFilter = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const status = req.query.status ? req.query.status : "";
    console.log("startDate", startDate, "endDate", endDate);
    if (req.query.startDate && req.query.endDate && req.query.status) {
      const filteredRecords = await Product.findAll({
        where: {
          status,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records",
        productList: filteredRecords,
      });
    } else if (req.query.startDate && req.query.endDate && !req.query.status) {
      const filteredRecords = await Product.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records",
        productList: filteredRecords,
      });
    } else if (req.query.status && !req.query.startDate && !req.query.endDate) {
      const filteredRecords = await Product.findAll({
        where: {
          status,
        },
      });

      res.status(200).json({
        message: "Filtered records",
        productList: filteredRecords,
      });
    } else if (!req.query.status && !req.query.startDate && !req.query.endDate) {
      const productList = await Product.findAll({});
      res.status(200).send({
        message: "productList",
        productList,
      });
    }
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const productExcelFile = async (req, res) => {
  try {
    const ProductData = await Product.findAll({});
    if (ProductData.length > 0) {
      const plainProductData = ProductData.map((product) => {
        const formattedProduct = product.get({ plain: true });

        // Rename headers
        formattedProduct.SKU = formattedProduct.sku;

        formattedProduct.PRODUCTO = formattedProduct.product;
        formattedProduct.PRESENTACIÓN = formattedProduct.presentation;
        formattedProduct.PRECIO = formattedProduct.price;
        formattedProduct.PRECIO = formattedProduct.price;
        formattedProduct.CATEGORÍA = formattedProduct.category;
        formattedProduct.STOCK = formattedProduct.stock;
        formattedProduct.ESTADO = formattedProduct.status;
        formattedProduct.F_CREACIÓN = formatDate(formattedProduct.createdAt);

        // Remove unwanted fields
        const unwantedFields = [
          "createdAt",
          "updatedAt",
          "id",
          "categoryId",
          "category",
          "product",
          "brand",
          "composition",
          "laboratory",
          "stock",
          "status",
          "sku",
          "description",
          "reason",
          "price",
          "presentation",
        ];
        unwantedFields.forEach((field) => delete formattedProduct[field]);

        return formattedProduct;
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("products");

      // Assuming the first object in the data array contains all possible keys
      const headers = Object.keys(plainProductData[0]);
      worksheet.addRow(headers);

      // Adding rows with data
      plainProductData.forEach((product) => {
        const row = [];
        headers.forEach((header) => {
          row.push(product[header]);
        });
        worksheet.addRow(row);
      });

      // Prepare the Excel file for download
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=product.xlsx");

      // Write the workbook data to the response
      await workbook.xlsx.write(res);
      res.end();
    } else {
      res.status(400).send({
        message: "data not found",
      });
    }
  } catch (error) {
    console.error("Error exporting Excel file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
}
const updateProductStatus = async () => {
  try {
    await Product.update(
      { status: "inactive" },
      {
        where: {
          stock: 0,
        },
      },
    );
  } catch (error) {
    console.error("Error updating appointments:", error);
  }
};

updateProductStatus();
const intervalId = setInterval(updateProductStatus, 1 * 60 * 1000);

setTimeout(() => {
  clearInterval(intervalId);
}, 60 * 60 * 1000);
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  productFilter,
  productExcelFile,
  updateProductStock,
  getProductHistory,
  getSingleProduct,
};
