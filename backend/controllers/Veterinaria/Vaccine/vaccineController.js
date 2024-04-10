const { Op } = require("sequelize");
const Database = require("../../../config/connection");
const Vaccine = Database.vaccine;
const Vaccination = Database.vaccination;
const Admin = Database.user;
const jwt = require("jsonwebtoken")
const ExcelJS = require("exceljs");
const createVaccine = async (req, res) => {
  try {
    const existVaccine = await Vaccine.findOne({
      where: { name: req.body.name },
    });
    if (existVaccine) {
      return res.status(400).json({
        message: "vaccine already exist",
      });
    }
    const vaccine = {
      name: req.body.name,
      validity: req.body.validity,
      stock: req.body.stock,
    };
    if (vaccine.name === "" || vaccine.name === null) {
      res.status(400).send({
        message: "name ie required",
      });
    } else if (vaccine.validity === "" || vaccine.validity === null) {
      res.status(400).send({
        message: "validity ie required",
      });
    } else if (vaccine.stock === "" || vaccine.stock === null) {
      res.status(400).send({
        message: "stock ie required",
      });
    } else {
      await Vaccine.create(vaccine).then((result) => {
        return res.status(201).send({
          message: "vaccine created",
          result: result,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error vaccine creation",
      error: error.message,
    });
  }
};

const updateVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    const vaccineExist = await Vaccine.findOne({ where: { id: id } });

    const vaccine = {
      name: req.body.name,
      validity: req.body.validity,
      stock: req.body.stock,
    };

    if (vaccineExist) {
      await Vaccine.update(vaccine, { where: { id: id } });
      res.status(200).send({
        message: "vaccine updated successfully",
      });
    } else {
      res.status(404).send({
        message: "vaccine not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating vaccine",
      error: error.message,
    });
  }
};
const deleteVaccine = async (req, res) => {
  const id = req.params.id;
  const vaccine = await Vaccine.findOne({ where: { id: id } });
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
  if (vaccine?.id === id) {
    await Vaccine.destroy({ where: { id: id } });
    return res.status(200).send({
      message: "vaccine deleted successfully",
      success: true,
    });
  } else {
    return res.status(404).send({
      message: "vaccine record not found",
      success: false,
    });
  }
};

const getAllVaccines = async (req, res) => {
  const vaccinesList = await Vaccine.findAll({
    include: [
      {
        model: Vaccination,
        as: "vaccinationData",
        attributes: ["exploration"],
      },
    ],
  });
  const vaccineList = vaccinesList.map((vaccine) => {
    const vaccines = {
      id: vaccine.id,
      name: vaccine.name,
      validity: vaccine.validity,
      stock: vaccine.stock,
      creation: vaccine.createdAt,
    };

    const aptosCount = vaccine?.vaccinationData.filter(
      (vaccination) => vaccination.exploration === "APTO"
    ).length;

    return { ...vaccines, aptos: aptosCount };
  });
  res.status(200).send({
    message: "vaccineList",
    vaccineList,
  });
};
const getSingleVaccine = async (req, res) => {
  const id = req.params.id;
  const vaccines = await Vaccine.findOne({
    include: [
      {
        model: Vaccination,
        as: "vaccinationData",
      },
    ],
    where: { id: id },
  });
  const vaccine = {
    name: vaccines.name,
    validity: vaccines.validity,
    stock: vaccines.stock,
    creation: vaccines.createdAt,
  };
  const apto = vaccines.vaccinationData.filter(
    (ele) => ele.exploration === "APTO"
  ).length;
  const vaccinated = vaccines.vaccinationData.filter(
    (ele) => ele.status === "vaccinated"
  ).length;
  res.status(200).send({
    message: "vaccine",
    vaccine,
    apto,
    vaccinated,
  });
};
const vaccineFilter = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
   
    if (req.query.startDate && req.query.endDate) {
      const filteredRecords = await Vaccine.findAll({
        include: [
          {
            model: Vaccination,
            as: "vaccinationData",
            attributes: ["exploration"],
          },
        ],
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      const vaccineList = filteredRecords.map((vaccine) => {
        const vaccines = {
          id: vaccine.id,
          name: vaccine.name,
          validity: vaccine.validity,
          stock: vaccine.stock,
          creation: vaccine.createdAt,
        };
    
        const aptosCount = vaccine?.vaccinationData.filter(
          (vaccination) => vaccination.exploration === "APTO"
        ).length;
    
        return { ...vaccines, aptos: aptosCount };
      });
      res.status(200).json({
        message: "Filtered records",
        vaccineList: vaccineList,
      });
    } else {
      const vaccinesList = await Vaccine.findAll({ include: [
        {
          model: Vaccination,
          as: "vaccinationData",
          attributes: ["exploration"],
        },
      ], order: [["createdAt", "DESC"]], });
      const vaccineList = vaccinesList.map((vaccine) => {
        const vaccines = {
          id: vaccine.id,
          name: vaccine.name,
          validity: vaccine.validity,
          stock: vaccine.stock,
          creation: vaccine.createdAt,
        };
    
        const aptosCount = vaccine?.vaccinationData.filter(
          (vaccination) => vaccination.exploration === "APTO"
        ).length;
    
        return { ...vaccines, aptos: aptosCount };
      });
      res.status(200).send({
        message: "vaccineList",
        vaccineList,
      });
    }
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const vaccineExcelFile = async (req, res) => {
  try {
    const vaccineData = await Vaccine.findAll({
      include: [
        {
          model: Vaccination,
          as: "vaccinationData",
          attributes: ["exploration"],
        },
      ],
    });
    const plainVaccineData = vaccineData.map((vaccine) => {
      const formattedVaccine = vaccine.get({ plain: true });

      // Rename headers
      formattedVaccine.ID = formattedVaccine.id;
      formattedVaccine.TIPO = formattedVaccine.name;
      formattedVaccine.STOCK = formattedVaccine.stock;
      formattedVaccine.F_DE_CREACIÓN = formatDate(formattedVaccine.createdAt);
      formattedVaccine.TIEMPO_VALIDEZ = formattedVaccine.validity;

      const aptosCount = formattedVaccine.vaccinationData.filter(
        (vaccination) => vaccination.exploration === "APTO"
      ).length;

      formattedVaccine.N_DE_APTOS = aptosCount;

      const unwantedFields = [
        "createdAt",
        "updatedAt",
        "id",
        "name",
        "stock",
        "validity",
        "exploration",
        "vaccinationData",
      ];
      unwantedFields.forEach((field) => delete formattedVaccine[field]);

      return formattedVaccine;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("vaccines");

    // Assuming the first object in the data array contains all possible keys
    const headers = Object.keys(plainVaccineData[0]);
    worksheet.addRow(headers);

    // Adding rows with data
    plainVaccineData.forEach((vaccine) => {
      const row = [];
      headers.forEach((header) => {
        row.push(vaccine[header]);
      });
      worksheet.addRow(row);
    });

    // Prepare the Excel file for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=vaccine.xlsx");

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
module.exports = {
  createVaccine,
  updateVaccine,
  deleteVaccine,
  getAllVaccines,
  vaccineFilter,
  vaccineExcelFile,
  getSingleVaccine,
};
