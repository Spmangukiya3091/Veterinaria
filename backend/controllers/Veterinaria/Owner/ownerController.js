const { Op } = require("sequelize");
const Database = require("../../../config/connection");
const Owner = Database.owner;
const Appointment = Database.appointment;
const jwt = require("jsonwebtoken")
const ExcelJS = require("exceljs");
const Pet = Database.pet;
const Admin = Database.user;
const createOwner = async (req, res) => {
  try {
    const owner = {
      name: req.body.name,
      surname: req.body.surname,
      phone_1: req.body.phone_1,
      phone_2: req.body.phone_2,
      doc_identity: req.body.doc_identity,
      email: req.body.email,
      address:
        req.body.address === "" || !req.body.address ? null : req.body.address,
      dob: req.body.dob === "" || !req.body.dob ? null : new Date(req.body.dob),
      department:
        req.body.department === "" || !req.body.department
          ? null
          : req.body.department,
      district:
        req.body.district === "" || !req.body.district
          ? null
          : req.body.district,
    };
    if (owner.name === "" || owner.name === null) {
      res.status(201).send({
        message: "name is required",
      });
    } else if (owner.surname === "" || owner.surname === null) {
      res.status(201).send({
        message: "surname is required",
      });
    } else if (owner.phone === "" || owner.phone === null) {
      res.status(201).send({
        message: "phone is required",
      });
    } else if (owner.doc_identity === "" || owner.doc_identity === null) {
      res.status(201).send({
        message: "doc_identity is required",
      });
    } else if (owner.email === "" || owner.email === null) {
      res.status(201).send({
        message: "email is required",
      });
    } else {
      Owner.create(owner).then((result) => {
        res.status(201).send({
          message: "owner created",
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

const updateOwner = async (req, res) => {
  try {
    const id = req.params.id;
    const ownerExist = await Owner.findOne({ where: { id: id } });

    const owner = {
      name: req.body.name,
      surname: req.body.surname,
      owner: req.body.owner,
      phone_1: req.body.phone_1,
      phone_2: req.body.phone_2,
      doc_identity: req.body.doc_identity,
      email: req.body.email,
      address: req.body.address,

      department: req.body.department,
      district: req.body.district,
    };

    if (ownerExist) {
      await Owner.update(owner, { where: { id: id } });
      res.status(200).send({
        message: "owner record updated successfully",
      });
    } else {
      res.status(404).send({
        message: "owner record not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating owner",
      error: error.message,
    });
  }
};
const deleteOwnerRecord = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "hello$%#@!ADMIN___++");
  const owner_record = await Owner.findOne({ where: { id: id } });
  const { pass, email } = req.body;
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
  if (owner_record?.id === id) {
    await Owner.destroy({ where: { id: id } });
    res.status(200).send({
      message: "owner deleted successfully",
      success: true,
    });
  } else {
    return res.status(404).send({
      message: "owner record not found",
      success: false,
    });
  }
};

const ownerExcelFile = async (req, res) => {
  try {
    const ownerData = await Owner.findAll({});
    const plainOwnerData = ownerData.map((owner) => {
      const formattedOwner = owner.get({ plain: true });
      formattedOwner.dob = formatDate(formattedOwner.dob);

      formattedOwner.ID = formattedOwner.id;
      formattedOwner.PROPIETARIO = formattedOwner.name;
      formattedOwner.DIRECCIÓN = formattedOwner.address;
      formattedOwner.TELÉFONO = formattedOwner.phone_1;
      formattedOwner.DOC_IDENTIDAD = formattedOwner.doc_identity;
      formattedOwner.creation = formatDate(formattedOwner.createdAt);
      const unwantedFields = [
        "createdAt",
        "updatedAt",
        "id",
        "dob",
        "name",
        "surname",
        "phone_1",
        "phone_2",
        "doc_identity",
        "email",
        "address",
        "department",
        "district",
      ];

      unwantedFields.forEach((field) => delete formattedOwner[field]);

      return formattedOwner;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Appointments");

    const headers = Object.keys(plainOwnerData[0]);
    worksheet.addRow(headers);

    plainOwnerData.forEach((appointment) => {
      const row = [];
      headers.forEach((header) => {
        row.push(appointment[header]);
      });
      worksheet.addRow(row);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=appointment.xlsx"
    );

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

const getAllOwners = async (req, res) => {
  const ownersList = await Owner.findAll({});
  res.status(200).send({
    message: "ownersList",
    ownersList,
  });
};

const getAllPetsByOwner = async (req, res) => {
  const id = req.params.id;

  try {
    const owner = await Owner.findByPk(id, {
      include: [
        {
          model: Pet,
          as: "ownerData",
        },
      ],
    });

    if (!owner) {
      return res.status(404).send({
        message: "Owner not found",
      });
    }

    const ownerName = owner.name;
    const pets = owner.ownerData;

    res.status(200).send({
      message: "Owner's pets",
      owner: ownerName,
      pets,
    });
  } catch (error) {
    console.error("Error fetching owner's pets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getSingleOwner = async (req, res) => {
  try {
    const id = req.params.id;
    const totalPets = await Pet.count({ where: { ownerId: id } });
    const owner = await Owner.findByPk(id, {
      include: [
        {
          model: Appointment,
          as: "ownerAppointmentData",
        },
      ],
    });
    console.log("---------", owner);
    if (!owner) {
      return res.status(404).send({ message: "owner not found" });
    }

    // Calculate total appointment count
    const totalAppointments = owner.ownerAppointmentData.length;

    // Calculate pending appointment count
    const completeAppointments = owner.ownerAppointmentData.filter(
      (appointment) => appointment.status === "complete"
    ).length;

    // Find the last appointment date and time
    let lastAppointment = null;
    if (owner.ownerAppointmentData.length > 0) {
      owner.ownerAppointmentData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      lastAppointment = {
        date: owner.ownerAppointmentData[0].date,
      };
    }
    const ownerData = {
      workingDays: owner.workingDays,
      id: owner.id,
      avatar: owner.avatar,
      name: owner.name,
      surname: owner.surname,
      doc_identity: owner.doc_identity,
      identity: owner.identity,
      dob: owner.dob,
      phone_1: owner.phone_1,
      phone_2: owner.phone_2,
      email: owner.email,
      address: owner.address,
      department: owner.department,
      district: owner.district,
      createdAt: owner.createdAt,
    };
    res.status(200).send({
      message: "owner",
      ownerData,
      lastAppointment,
      totalAppointments,
      completeAppointments,
      totalPets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const petAppointmentDataOfOwner = async (req, res) => {
  const id = req.params.id;
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const status = req.query.status;
  if (req.query.startDate && req.query.endDate && req.query.status) {
    const owners = await Owner.findOne({
      include: [
        {
          model: Appointment,
          as: "ownerAppointmentData",
          where: {
            [Op.and]: [
              {
                createdAt: {
                  [Op.gte]: startDate,
                  [Op.lte]: endDate,
                },
              },
              { status },
            ],
          },
        },
      ],
      where: { id: id },
    });
    const owner = owners?.name;
    const appointments = owners?.ownerAppointmentData
      ? owners?.ownerAppointmentData
      : [];
    res.status(200).send({
      message: "appointmentList",

      owner: owner,
      appointments: appointments,
    });
  } else if (req.query.startDate && req.query.endDate && !req.query.status) {
    const owners = await Owner.findOne({
      include: [
        {
          model: Appointment,
          as: "ownerAppointmentData",
          where: {
            [Op.and]: [
              {
                createdAt: {
                  [Op.gte]: startDate,
                  [Op.lte]: endDate,
                },
              },
            ],
          },
        },
      ],
      where: { id: id },
    });
    const owner = owners?.name;
    const appointments = owners?.ownerAppointmentData
      ? owners?.ownerAppointmentData
      : [];
    res.status(200).send({
      message: "appointmentList",

      owner: owner,
      appointments: appointments,
    });
  } else if (!req.query.startDate && !req.query.endDate && req.query.status) {
    const owners = await Owner.findOne({
      include: [
        {
          model: Appointment,
          as: "ownerAppointmentData",
          where: {
            status,
          },
        },
      ],
      where: { id: id },
    });
    const owner = owners?.name;
    const appointments = owners?.ownerAppointmentData
      ? owners?.ownerAppointmentData
      : [];
    res.status(200).send({
      message: "appointmentList",

      owner: owner,
      appointments: appointments,
    });
  }else if (!req.query.startDate && !req.query.endDate && !req.query.status) {
    const owners = await Owner.findOne({
      include: [
        {
          model: Appointment,
          as: "ownerAppointmentData",
        },
      ],
      where: { id: id },
    });
    const owner = owners?.name;
    const appointments = owners?.ownerAppointmentData
      ? owners?.ownerAppointmentData
      : [];
    res.status(200).send({
      message: "appointmentList",

      owner: owner,
      appointments: appointments,
    });
  }
};

const ownerFilter = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    if (req.query.startDate && req.query.endDate) {
      const filteredRecords = await Owner.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records",
        ownersList: filteredRecords,
      });
    } else {
      const ownersList = await Owner.findAll({});
      res.status(200).send({
        message: "ownersList",
        ownersList,
      });
    }
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOwner,
  updateOwner,
  deleteOwnerRecord,
  ownerExcelFile,
  getAllOwners,
  ownerFilter,
  getAllPetsByOwner,
  petAppointmentDataOfOwner,
  getSingleOwner,
};
