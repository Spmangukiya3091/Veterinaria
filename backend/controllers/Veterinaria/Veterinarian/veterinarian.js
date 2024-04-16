const { Op } = require("sequelize");
const Database = require("../../../config/connection");
const Veterinarian = Database.veterinarian;
const Appointment = Database.appointment;
const Owner = Database.owner;
const Pet = Database.pet;
const ExcelJS = require("exceljs");
const moment = require('moment');
const Admin = Database.user;
const jwt = require("jsonwebtoken");
const fs = require("fs");

const createVeterinarian = async (req, res) => {
  try {
    const veterinarian = {
      avatar: req.file
        ? req.protocol +
        "://" +
        req.get("host") +
        `/profile/veterinarian/${req.file.filename}`
        : null,
      name: req.body.name,
      surname: req.body.surname,
      speciality:
        req.body.speciality === "" || !req.body.speciality
          ? null
          : req.body.speciality,
      specialityId: req.body.specialityId,
      dob: new Date(req.body.dob),
      phone: req.body.phone,
      email: req.body.email,
      identity: req.body.identity,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      sex: req.body.sex,
      address:
        req.body.address === "" || !req.body.address ? null : req.body.address,
      department: req.body.department,
      district:
        req.body.district === "" || !req.body.district
          ? null
          : req.body.district,
      workingDays: req.body.workingDays,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    };
    if (veterinarian.name === "" || veterinarian.name === null) {
      res.status(400).send({
        message: "name is required",
      });
    } else if (veterinarian.surname === "" || veterinarian.surname === null) {
      res.status(400).send({
        message: "surname is required",
      });
    } else if (veterinarian.dob === "" || veterinarian.dob === null) {
      res.status(400).send({
        message: "dob is required",
      });
    } else if (veterinarian.phone === "" || veterinarian.phone === null) {
      res.status(400).send({
        message: "phone is required",
      });
    } else if (veterinarian.email === "" || veterinarian.email === null) {
      res.status(400).send({
        message: "email is required",
      });
    } else if (veterinarian.identity === "" || veterinarian.identity === null) {
      res.status(400).send({
        message: "identity is required",
      });
    } else if (veterinarian.password === "" || veterinarian.password === null) {
      res.status(400).send({
        message: "password is required",
      });
    } else if (
      veterinarian.confirmPassword === "" ||
      veterinarian.confirmPassword === null
    ) {
      res.status(400).send({
        message: "confirmPassword is required",
      });
    } else if (veterinarian.sex === "" || veterinarian.sex === null) {
      res.status(400).send({
        message: "sex is required",
      });
    } else if (
      veterinarian.department === "" ||
      veterinarian.department === null
    ) {
      res.status(400).send({
        message: "department is required",
      });
    } else if (
      veterinarian.workingDays === "" ||
      veterinarian.workingDays === null
    ) {
      res.status(400).send({
        message: "workingDays is required",
      });
    } else if (
      veterinarian.start_time === "" ||
      veterinarian.start_time === null
    ) {
      res.status(400).send({
        message: "start_time is required",
      });
    } else if (veterinarian.end_time === "" || veterinarian.end_time === null) {
      res.status(400).send({
        message: "end_time is required",
      });
    } else {
      if (veterinarian.password === veterinarian.confirmPassword) {
        Veterinarian.create(veterinarian).then((result) => {
          res.status(201).send({
            message: "veterinarian created",
            result: result,
          });
        });
      } else {
        res.status(400).send({
          message: "password not match with confirm password",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Error veterinarian creation",
      error: error.message,
    });
  }
};

const updateVeterinarian = async (req, res) => {
  try {
    const id = req.params.id;
    const veterinarianExist = await Veterinarian.findOne({ where: { id: id } });
    const existingFilename = veterinarianExist?.avatar ? veterinarianExist?.avatar?.split("/").pop() : "";

    const imagePath = `./public/veterinarian/${existingFilename}`;
    const veterinarian = {
      avatar: req.file ?
        req.protocol +
        "://" +
        req.get("host") +
        `/profile/veterinarian/${req.file.filename}` : req.body.avatar,
      name: req.body.name,
      surname: req.body.surname,
      speciality: req.body.speciality,
      dob: new Date(req.body.dob),
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      sex: req.body.sex,
      address: req.body.address,
      department: req.body.department,
      district: req.body.district,
      workingDays: req.body.workingDays,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    };

    if (veterinarianExist) {
      await Veterinarian.update(veterinarian, { where: { id: id } });

      if (req.file && req.file.filename !== "" && existingFilename !== "") {
        fs.unlink(imagePath, (err) => {
          if (err) {
            res.status(400).send({
              message: "profile not updated",
            });
          } else {
            res.status(200).send({
              message: "profile updated successfully",
            });
          }
        });
      } else {
        res.status(200).send({
          message: "profile updated successfully",
        });
      }
    } else {
      res.status(404).send({
        message: "veterinarian not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating veterinarian",
      error: error.message,
    });
  }
};
const deleteVeterinarian = async (req, res) => {
  try {
    const id = req.params.id;
    const veterinarian = await Veterinarian.findOne({ where: { id: id } });
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

    if (!veterinarian) {
      return res.status(404).send({
        message: "Veterinarian record not found",
        success: false,
      });
    }

    const existingFilename = veterinarian?.avatar.split("/").pop();
    const imagePath = `./public/veterinaria/veterinarian/${existingFilename}`;
    console.log("imagePath", imagePath);
    console.log("existingFilename", existingFilename);

    if (imagePath != "" || existingFilename != undefined) {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath, async (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      }
    }

    await Veterinarian.destroy({ where: { id: id } });
    await Appointment.destroy({ where: { veterinarianId: id } });

    return res.status(200).send({
      message: "Veterinarian deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting veterinarian:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getAllVeterinarians = async (req, res) => {
  const veterinarianList = await Veterinarian.findAll({});
  res.status(200).send({
    message: "veterinarianList",
    veterinarianList,
  });
};

const veterinarianFilter = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const speciality = req.query.speciality ? req.query.speciality : "";

    if (req.query.startDate && req.query.endDate && req.query.speciality) {
      const filteredRecords = await Veterinarian.findAll({
        where: {
          speciality,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records",
        veterinarianList: filteredRecords,
      });
    } else if (
      req.query.startDate &&
      req.query.endDate &&
      !req.query.speciality
    ) {
      const filteredRecords = await Veterinarian.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records",
        veterinarianList: filteredRecords,
      });
    } else if (
      req.query.speciality &&
      !req.query.startDate &&
      !req.query.endDate
    ) {
      const filteredRecords = await Veterinarian.findAll({
        where: {
          speciality,
        },
      });

      res.status(200).json({
        message: "Filtered records",
        veterinarianList: filteredRecords,
      });
    } else if (
      !req.query.speciality &&
      !req.query.startDate &&
      !req.query.endDate
    ) {
      const veterinarianList = await Veterinarian.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).send({
        message: "veterinarianList",
        veterinarianList,
      });
    }
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const veterinarianExcelFile = async (req, res) => {
  try {
    const id = req.params.id;
    const veterinarian = await Veterinarian.findByPk(id, {
      include: [
        {
          model: Appointment,
          as: "vetsAppointment",
        },
      ],
    });

    if (!veterinarian) {
      return res.status(404).send({ message: "Veterinarian not found" });
    }

    const veterinarianData = {
      id: veterinarian.id,
      name: veterinarian.name,
      surname: veterinarian.surname,
      dob: veterinarian.dob,
      phone: veterinarian.phone,
      email: veterinarian.email,
      speciality: veterinarian.speciality,
      workingDays: veterinarian.workingDays,
      identity: veterinarian.identity,
      sex: veterinarian.sex,
      address: veterinarian.address,
      department: veterinarian.department,
      district: veterinarian.district,
      start_time: veterinarian.start_time,
      end_time: veterinarian.end_time,
      createdAt: veterinarian.createdAt,
    };

    const columns = Object.keys(veterinarianData);
    const values = Object.values(veterinarianData);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Table Data");

    worksheet.addRow(columns);
    worksheet.addRow(values);

    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);

    // Merge cells and add appointments text
    worksheet.mergeCells("A4:P4"); // Merging starts from the fourth row
    const mergedCell = worksheet.getCell("A4");
    mergedCell.value = "Appointments";
    mergedCell.alignment = { horizontal: "center", vertical: "middle" };
    const appointments = veterinarian?.vetsAppointment
    appointments.forEach((veterinarianData) => {
      const keys = Object.keys(veterinarianData.dataValues);
      const values = Object.values(veterinarianData.dataValues)
      worksheet.addRow(keys);
      ; worksheet.addRow(values);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=veterinarian.xlsx"
    );

    await workbook.xlsx.write(res);
  } catch (error) {
    console.error("Error exporting Excel file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const appointmentData = async (req, res) => {
  try {
    const vet = req.query.name;
    const veterinarians = await Veterinarian.findAll({
      include: [
        {
          model: Appointment,
          as: "vetsAppointment",
        },
      ],
      where: { name: vet },
    });

    const data = [];

    veterinarians.forEach((vet) => {
      vet.vetsAppointment.forEach((appointment) => {
        data.push({
          name: vet.name,
          start: new Date(
            `${appointment.date.toISOString().split("T")[0]} ${appointment.scheduleStart
            }`
          ),
          end: new Date(
            `${appointment.date.toISOString().split("T")[0]} ${appointment.scheduleEnd
            }`
          ),
        });
      });
    });

    res.status(200).send({
      message: "appointmentList",
      veterinarian: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const appointmentDataBySingleVeterinarian = async (req, res) => {
  try {
    const id = req.params.id;

    if (id !== "") {
      const veterinarian = await Veterinarian.findByPk(id, {
        include: [
          {
            model: Appointment,
            as: "vetsAppointment",
          },
        ],
      });

      if (!veterinarian) {
        return res.status(404).send({ message: "Veterinarian not found" });
      }

      const data = [];

      veterinarian.vetsAppointment.forEach((appointment) => {
       const actualDate = new Date(appointment.date);
        const startHour = parseInt(appointment.scheduleStart.split(":")[0]);
        const startMinute  = parseInt(appointment.scheduleStart.split(":")[1]);
        const startDate = moment(actualDate)
        .hours(startHour)
        .minutes(startMinute);
      
console.log("startDate",startDate)
        const actualendDate = new Date(appointment.date);
        const endHour = parseInt(appointment.scheduleEnd.split(":")[0]);
        console.log("endHour",endHour)
       
        const endMinute = parseInt(appointment.scheduleEnd.split(":")[1]);
        console.log("endMinute",endMinute)
       
        const endDate = moment(actualendDate)
        .hours(endHour)
        .minutes(endMinute);
        data.push({
          title: appointment.observation,
          start: startDate,
          end: endDate,
        });
      });

      res.status(200).send({
        message: "Appointment list",
        veterinarian: data,
      });
    } else {
      res.send({
        message: "not found",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


const getSingleVeterinarians = async (req, res) => {
  try {
    const id = req.params.id;
    const veterinarian = await Veterinarian.findByPk(id, {
      include: [
        {
          model: Appointment,
          as: "vetsAppointment",
        },
      ],
    });

    if (!veterinarian) {
      return res.status(404).send({ message: "Veterinarian not found" });
    }

    // Calculate total appointment count
    const totalAppointments = veterinarian.vetsAppointment.length;

    // Calculate pending appointment count
    const pendingAppointments = veterinarian.vetsAppointment.filter(
      (appointment) => appointment.status === "Pending"
    ).length;

    // Find the last appointment date and time
    let lastAppointment = null;
    if (veterinarian.vetsAppointment.length > 0) {
      veterinarian.vetsAppointment.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      lastAppointment = {
        date: veterinarian.vetsAppointment[0].date,
        time: veterinarian.vetsAppointment[0].scheduleEnd, // Change this according to your column name
      };
    }
    const veterinarianData = {
      workingDays: veterinarian.workingDays,
      id: veterinarian.id,
      specialityId: veterinarian.specialityId,
      avatar: veterinarian.avatar,
      name: veterinarian.name,
      surname: veterinarian.surname,
      speciality: veterinarian.speciality,
      identity: veterinarian.identity,
      dob: veterinarian.dob,
      phone: veterinarian.phone,
      email: veterinarian.email,
      password: veterinarian.password,
      sex: veterinarian.sex,
      address: veterinarian.address,
      department: veterinarian.department,
      district: veterinarian.district,
      start_time: veterinarian.start_time,
      end_time: veterinarian.end_time,
      emailToken: veterinarian.emailToken,
      createdAt: veterinarian.createdAt,
    };
    res.status(200).send({
      message: "veterinarian",
      veterinarianData,
      lastAppointment,
      totalAppointments,
      pendingAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const ownersByVeterinarian = async (req, res) => {
  try {
    const veterinarians = await Appointment.findAll({
      where: { veterinarianId: req.params.veterinarianId },
      attributes: ["ownerId"],
    });

    const owners = await Owner.findAll({});
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    if (req.query.startDate && req.query.endDate) {
      const matchedOwners = owners
        .filter((owner) => {
          return (
            veterinarians.some((vet) => vet.ownerId === owner.id) &&
            new Date(owner.createdAt) >= startDate &&
            new Date(owner.createdAt) <= endDate
          );
        })
        .map(
          ({
            id,
            name,
            dob,
            surname,
            phone_1,
            phone_2,
            doc_identity,
            email,
            address,
            department,
            district,
          }) => ({
            id,
            name,
            dob,
            surname,
            phone_1,
            phone_2,
            doc_identity,
            email,
            address,
            department,
            district,
          })
        );

      res.status(200).send({
        message: "Owners matched by veterinarian",
        owners: matchedOwners,
      });
    } else {
      const matchedOwners = owners
        .filter((owner) => {
          return veterinarians.some((vet) => vet.ownerId === owner.id);
        })
        .map(
          ({
            id,
            name,
            dob,
            surname,
            phone_1,
            phone_2,
            doc_identity,
            email,
            address,
            department,
            district,
          }) => ({
            id,
            name,
            dob,
            surname,
            phone_1,
            phone_2,
            doc_identity,
            email,
            address,
            department,
            district,
          })
        );

      res.status(200).send({
        message: "Owners matched by veterinarian",
        owners: matchedOwners,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const petsByVeterinarian = async (req, res) => {
  try {
    const veterinarians = await Appointment.findAll({
      where: { veterinarianId: req.params.veterinarianId },
      attributes: ["petId"],
    });

    const pets = await Pet.findAll({});
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    if (req.query.startDate && req.query.endDate) {
      const matchedPets = pets
        .filter((pet) => {
          console.log("pet");

          return (
            veterinarians.some((vet) => vet.petId === pet.id) &&
            new Date(pet.createdAt) >= startDate &&
            new Date(pet.createdAt) <= endDate
          );
        })
        .map(
          ({
            id,
            name,
            owner,
            sex,
            age,
            Species,
            breed,
            hair,
            color,
            status,
            exploration,
            dob,
          }) => ({
            id,
            name,
            owner,
            sex,
            age,
            Species,
            breed,
            hair,
            color,
            status,
            exploration,
            dob,
          })
        );

      res.status(200).send({
        message: "pets matched by veterinarian",
        pets: matchedPets,
      });
    } else {
      const matchedPets = pets
        .filter((pet) => {
          return veterinarians.some((vet) => vet.petId === pet.id);
        })
        .map(
          ({
            id,
            name,
            owner,
            sex,
            age,
            Species,
            breed,
            hair,
            color,
            status,
            exploration,
            dob,
          }) => ({
            id,
            name,
            owner,
            sex,
            age,
            Species,
            breed,
            hair,
            color,
            status,
            exploration,
            dob,
          })
        );

      res.status(200).send({
        message: "pets matched by veterinarian",
        pets: matchedPets,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = {
  createVeterinarian,
  updateVeterinarian,
  deleteVeterinarian,
  getAllVeterinarians,
  getSingleVeterinarians,
  veterinarianExcelFile,
  veterinarianFilter,
  appointmentData,
  appointmentDataBySingleVeterinarian,
  ownersByVeterinarian,
  petsByVeterinarian,
};
