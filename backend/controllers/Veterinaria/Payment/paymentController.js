const { Op } = require("sequelize");
const Database = require("../../../config/connection");
const Payment = Database.payment;
const Admin = Database.user;
const jwt = require("jsonwebtoken")
const ExcelJS = require("exceljs");
const registerPayment = async (req, res) => {
  try {
   
    const payment = {
      payment_no: req.body.payment_no,
      transfer_no:
        req.body.transfer_no === "" || !req.body.transfer_no
          ? null
          : req.body.transfer_no,
      owner: req.body.owner === "" || !req.body.owner ? null : req.body.owner,
      doctor:
        req.body.doctor === "" || !req.body.doctor ? null : req.body.doctor,
      service: req.body.service,
      amount: req.body.amount,
      discount: req.body.discount,
      final_amount: req.body.final_amount,
      payment_method: req.body.payment_method,
      description:
        req.body.description === "" || !req.body.description
          ? null
          : req.body.description,
    };
    if (payment.payment_no === "" || payment.payment_no === null) {
      res.status(400).send({
        message: "payment no is required",
      });
    } else if (payment.service === "" || payment.service === null) {
      res.status(400).send({
        message: "service no is required",
      });
    } else if (payment.amount === "" || payment.amount === null) {
      res.status(400).send({
        message: "amount no is required",
      });
    } else if (payment.discount === "" || payment.discount === null) {
      res.status(400).send({
        message: "discount no is required",
      });
    } else if (
      payment.payment_method === "" ||
      payment.payment_method === null
    ) {
      res.status(400).send({
        message: "payment_method no is required",
      });
    } else {
      Payment.create(payment).then((result) => {
        res.status(201).send({
          message: "user created",
          result: result,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error Registering Payment",
      error: error.message,
    });
  }
};
const getSinglePayment = async (req, res) => {
  const id = req.params.id;
  const payment = await Payment.findOne({ where: { id: id } });
  res.status(200).send({
    message: "payment",
    payment,
  });
};
const updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const paymentexist = await Payment.findOne({ where: { id: id } });
   
    const payment = {
      payment_no: req.body.payment_no,
      transfer_no: req.body.transfer_no,
      owner: req.body.owner,
      doctor: req.body.doctor,
      service: req.body.service,
      amount: req.body.amount,
      discount: req.body.discount,
      final_amount:req.body.final_amount,
      payment_method: req.body.payment_method,
      description: req.body.description,
    };

    if (paymentexist) {
      await Payment.update(payment, { where: { id: id } });
      res.status(200).send({
        message: "payment record updated successfully",
      });
    } else {
      res.status(404).send({
        message: "payment record not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Payment",
      error: error.message,
    });
  }
};
const deletePaymentRecord = async (req, res) => {
  const id = req.params.id;
 
  const payment_record = await Payment.findOne({ where: { id: id } });
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
  if (payment_record?.id === id) {
    await Payment.destroy({ where: { id: id } });
    return  res.status(200).send({
      message: "userProfile deleted successfully",
      success: true,
    });
  } else {
    return  res.status(404).send({
      message: "payment record not found",
      success: false,
    });
  }
};
const paymentExcelFile = async (req, res) => {
  try {
    const PaymentData = await Payment.findAll({});
    const plainPaymentData = PaymentData.map((payment) => {
      const formattedPayment = payment.get({ plain: true });

      // Rename headers
      formattedPayment.NRO_DE_PAGO = formattedPayment.payment_no;

      formattedPayment.PACIENTE = formattedPayment.owner;
      formattedPayment.MÉTODO_DE_PAGO = formattedPayment.payment_method;
      formattedPayment.SERVICIO = formattedPayment.service;

      formattedPayment.F_CREACIÓN = formatDate(formattedPayment.createdAt);
      formattedPayment.MONTO_FINAL = formattedPayment.final_amount;
      // Remove unwanted fields
      const unwantedFields = [
        "createdAt",
        "updatedAt",
        "id",
        "final_amount",
        "veterinarian",
        "service",
        "payment_no",
        "payment_method",
        "discount",
        "description",
        "transfer_no",
        "doctor",
        "amount",
        "owner",
      ];
      unwantedFields.forEach((field) => delete formattedPayment[field]);

      return formattedPayment;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Owners");

    // Assuming the first object in the data array contains all possible keys
    const headers = Object.keys(plainPaymentData[0]);
    worksheet.addRow(headers);

    // Adding rows with data
    plainPaymentData.forEach((payment) => {
      const row = [];
      headers.forEach((header) => {
        row.push(payment[header]);
      });
      worksheet.addRow(row);
    });

    // Prepare the Excel file for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=payment.xlsx");

    // Write the workbook data to the response
    await workbook.xlsx.write(res);
    res.end();
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
const getAllPayments = async (req, res) => {
  const paymentsList = await Payment.findAll({});
  res.status(200).send({
    message: "paymentsList",
    paymentsList,
  });
};
const paymentFilter = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const payment_method = req.query.payment_method ? req.query.payment_method : "";

    if (req.query.startDate && req.query.endDate && req.query.payment_method) {
      const filteredRecords = await Payment.findAll({
        where: {
          payment_method,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records by date and payment method",
        paymentList: filteredRecords,
      });
    }else if (req.query.startDate && req.query.endDate && !req.query.payment_method) {
      const filteredRecords = await Payment.findAll({
        where: {
         
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records by date and payment method",
        paymentList: filteredRecords,
      });
    } else if (req.query.payment_method && !req.query.startDate && !req.query.endDate) {
      const filteredByPaymentMethod = await Payment.findAll({
        where: {
          payment_method,
        },
      });

      res.status(200).json({
        message: "Filtered records by payment method",
        paymentList: filteredByPaymentMethod,
      });
    }  else if (!req.query.payment_method && !req.query.startDate && !req.query.endDate){
      const paymentList = await Payment.findAll({ order: [["createdAt", "DESC"]], });
      res.status(200).send({
        message: "All payment records",
        paymentList,
      });
    }
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerPayment,
  updatePayment,
  deletePaymentRecord,
  paymentExcelFile,
  getAllPayments,
  paymentFilter,
  getSinglePayment,
};
