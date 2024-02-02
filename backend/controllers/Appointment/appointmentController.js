const { Op, Sequelize } = require("sequelize");
const Database = require("../../config/connection");
const Appointment = Database.appointment;
const ExcelJS = require("exceljs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const moment = require("moment");
const Admin = Database.user;
const createAppointment = async (req, res) => {
  try {
    const appointment = {
      pet: req.body.pet,
      petId: req.body.petId,
      owner: req.body.owner,
      ownerId: req.body.ownerId,
      veterinarian: req.body.veterinarian,
      veterinarianId: req.body.veterinarianId,
      date: new Date(req.body.date),
      status: "pending",
      scheduleStart: req.body.scheduleStart,
      scheduleEnd: req.body.scheduleEnd,
      observation: req.body.observation,
      condition_name: req.body.condition_name,
      description: req.body.description,
      documentation: req.body.documentation,
      medication: req.body.medication,
      internal_observation: req.body.internal_observation,
      rating: 0,
    };

    if (appointment.owner === "" || appointment.owner === null) {
      res.status(400).json({
        message: "owner name is required",
      });
    } else if (appointment.veterinarian === "" || appointment.veterinarian === null) {
      res.status(400).json({
        message: "veterinarian name is required",
      });
    } else if (appointment.date === "" || appointment.date === null) {
      res.status(400).json({
        message: "date name is required",
      });
    } else if (appointment.scheduleStart === "" || appointment.scheduleStart === null) {
      res.status(400).json({
        message: "scheduleStart is required",
      });
    } else if (appointment.scheduleEnd === "" || appointment.scheduleEnd === null) {
      res.status(400).json({
        message: "scheduleEnd is required",
      });
    } else if (appointment.pet === "" || appointment.pet === null) {
      res.status(400).json({
        message: "pet name is required",
      });
    } else {
      Appointment.create(appointment).then((result) => {
        res.status(201).json({
          message: "appointment created",
          result: result,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error Registering appointment",
      error: error.message,
    });
  }
};

const registerDiagnostic = async (req, res) => {
  try {
    const id = req.params.id;
    const appointmentExist = await Appointment.findOne({ where: { id: id } });
    const documentationFiles = req.files;
    const array = documentationFiles.reduce((acc, file, i) => {
      const uploadedFileName = req.files[i].originalname;
      acc.push({
        [uploadedFileName]: `${req.protocol}://${req.get("host")}/profile/appointment/${file.filename}`,
      });
      return acc;
    }, []);
    const documentation_array = JSON.parse(array);
    
    const appointment = {
      condition_name: req.body.condition_name,
      description: req.body.description,

      documentation: documentation_array,

      medication: req.body.medication === "" || !req.body.medication ? null : JSON.parse(req.body.medication),
      internal_observation: req.body.internal_observation === "" || !req.body.internal_observation ? null : req.body.internal_observation,
      status: "complete",
      rating: req.body.rating,
    };
    if (appointmentExist) {
      if (appointment.condition_name === "" || appointment.condition_name === null) {
        res.status(400).send({
          message: "condition_name is required",
        });
      } else if (appointment.description === "" || appointment.description === null) {
        res.status(400).send({
          message: "description is required",
        });
      } else if (appointment.rating === "" || appointment.rating === null) {
        res.status(400).send({
          message: "rating is required",
        });
      } else {
        await Appointment.update(appointment, { where: { id: id } });
        res.status(200).send({
          message: "appointment record updated successfully",
        });
      }
    } else {
      res.status(404).send({
        message: "appointment record not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating appointment",
      error: error.message,
    });
  }
};
const updateAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointmentExist = await Appointment.findOne({ where: { id: id } });

    const appointment = {
      owner: req.body.owner,
      ownerId: req.body.ownerId,
      pet: req.body.pet,
      petId: req.body.petId,
      veterinarian: req.body.veterinarian,
      veterinarianId: req.body.veterinarianId,
      date: new Date(req.body.date),
      status: "pending",
      scheduleStart: req.body.scheduleStart,
      scheduleEnd: req.body.scheduleEnd,
      observation: req.body.observation,
    };

    if (appointmentExist) {
      await Appointment.update(appointment, { where: { id: id } });
      res.status(200).send({
        message: "appointment record updated successfully",
      });
    } else {
      res.status(404).send({
        message: "appointment record not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating appointment",
      error: error.message,
    });
  }
};
// const deleteAppointmentRecord = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const appointment_record = await Appointment.findOne({ where: { id: id } });
//     const { pass, email } = req.body;
//     const password = await Admin.findOne({
//       where: { email: email, password: pass },
//     });

//     if (!password) {
//       return res.status(400).send({
//         message: "Password doesn't match",
//         success: false,
//       });
//     }

//     if (!appointment_record) {
//       return res.status(400).send({
//         message: "Record not found",
//         success: false,
//       });
//     }

//     if (password.role !== "masterAdmin") {
//       return res.status(400).send({
//         message: "Not authorized",
//         success: false,
//       });
//     }
//     console.log("appointment_record.documentation", appointment_record.documentation);
//     const myArray = JSON.parse(appointment_record.documentation);
//     console.log("myArray", appointment_record.documentation);
//     if (myArray.length > 0) {
//       myArray.map((docPath) => {
//         const fileName = Object.keys(docPath)[0];
//         console.log("fileName--------------------------", fileName);
//         const imagePath = `./public/veterinaria/appointment/${fileName}`;

//         fs.unlinkSync(imagePath, async (err) => {
//           if (err) {
//             console.error("Error deleting file:", err);
//           }
//         });
//       });
//     }

//     await Appointment.destroy({ where: { id: id } });

//     return res.status(200).send({
//       message: "Appointment deleted successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error deleting appointment:", error);
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

const deleteAppointmentRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment_record = await Appointment.findOne({ where: { id: id } });
    const { pass, email } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "hello$%#@!ADMIN___++");
    const user = await Admin.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(400).send({
        message: "Not authorized",
        success: false,
      });
    }

    if (decoded.role !== user.role) {
      return res.status(400).send({
        message: "Not authorized",
        success: false,
      });
    }
    if (pass !== user.password) {
      return res.status(400).send({
        message: "Password doesn't match",
        success: false,
      });
    }

    if (!appointment_record) {
      return res.status(400).send({
        message: "Record not found",
        success: false,
      });
    }

    if (appointment_record.documentation !== null) {
      const myArray = appointment_record.documentation;
      console.log("myArray", myArray.length);
      if (myArray.length > 0) {
        myArray.map((docPath) => {
          const fileName = Object.keys(docPath)[0];
          console.log("fileName--------------------------", fileName);
          const imagePath = `./public/veterinaria/appointment/${fileName}`;

          fs.unlinkSync(imagePath, async (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            }
          });
        });
      }
    }

    await Appointment.destroy({ where: { id: id } });

    return res.status(200).send({
      message: "Appointment deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
const appointmentExcelFile = async (req, res) => {
  try {
    const appointmentData = await Appointment.findAll({});
    const plainAppointmentData = appointmentData.map((appointment) => {
      const formattedAppointment = appointment.get({ plain: true });

      // Rename headers
      formattedAppointment.COD = formattedAppointment.id;

      formattedAppointment.MASCOTA = formattedAppointment.pet;
      formattedAppointment.VETERINATIO = formattedAppointment.veterinarian;
      formattedAppointment.FECHA = formatDate(formattedAppointment.date);

      formattedAppointment.HORARIO = `${formattedAppointment.scheduleStart} - ${formattedAppointment.scheduleEnd}`;

      formattedAppointment.CALIFICACIÓN = formattedAppointment.rating;
      formattedAppointment.ESTADO = formattedAppointment.status;
      formattedAppointment.CREATION = formatDate(formattedAppointment.createdAt);

      // Remove unwanted fields
      const unwantedFields = [
        "createdAt",
        "updatedAt",
        "id",
        "pet",
        "veterinarian",
        "scheduleStart",
        "observation",
        "scheduleEnd",
        "rating",
        "status",
        "petId",
        "ownerId",
        "medication",
        "date",
        "owner",
        "condition_name",
        "description",
        "documentation",
        "internal_observation",
        "veterinarianId",
      ];
      unwantedFields.forEach((field) => delete formattedAppointment[field]);

      return formattedAppointment;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Appointments");

    const headers = Object.keys(plainAppointmentData[0]);
    worksheet.addRow(headers);

    plainAppointmentData.forEach((appointment) => {
      const row = [];
      headers.forEach((header) => {
        row.push(appointment[header]);
      });
      worksheet.addRow(row);
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=appointment.xlsx");

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

// const updateAppointmentsStatus = async () => {
//   try {
//     const currentTime = moment();
//     const sixHoursAgo = moment().subtract(6, 'hours');
// console.log("currentTime",currentTime)
// console.log("sixHoursAgo",sixHoursAgo)
//     await Appointment.update(
//       { status: "no attempt" },
//       {
//         where: {
//           [Op.or]: [
//             {
//               status: "pending",
//               scheduleEnd: { [Op.gte]: sixHoursAgo.toDate() },
//             },
//             {
//               status: "pending",
//               date: {
//                 [Op.lt]: currentTime.toDate(),
//                 [Op.lte]: currentTime.toDate(),
//               },
//             },
//           ],
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error updating appointments:", error);
//   }
// };

const updateAppointmentsStatus = async () => {
  try {
    const currentTime = moment();

    const today = moment().startOf("day");

    const appointments = await Appointment.findAll();

    appointments.forEach(async (appointment) => {
      const scheduleEndTime = moment(appointment.scheduleEnd, "HH:mm");

      const isToday = moment(appointment.date).isSame(today, "day");
      const isGoneDays = moment(appointment.date).isBefore(today, "day");
      const sixHoursDuration = moment.duration(6, "hours");

      const addition = scheduleEndTime.clone().add(sixHoursDuration);

      if (isToday || isGoneDays) {
        if (addition.isSameOrBefore(currentTime)) {
          if (appointment.status === "pending") {
            await Appointment.update({ status: "no attempt" }, { where: { id: appointment.id } });
          }
        }
      }
    });
  } catch (error) {
    console.error("Error updating appointments:", error);
  }
};

const dateWiseAppointment = async (req, res) => {
  try {
    const { day, date } = req.query;

    let filteredAppointments = [];

    if (day && date) {
      // Find appointments for the given day and date

      filteredAppointments = await Appointment.findAll({
        where: {
          [Op.and]: [Sequelize.literal(`DAYNAME(date) = '${day}'`), Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), date)],
        },
      });
    } else if (day) {
      // Find appointments for the given day
      filteredAppointments = await Appointment.findAll({
        where: Sequelize.literal(`DAYNAME(date) = '${day}'`),
      });
    } else if (date) {
      // Find appointments for the given date
      filteredAppointments = await Appointment.findAll({
        where: Sequelize.where(Sequelize.fn("DATE", Sequelize.col("date")), date),
      });
    }

    res.status(200).send({
      message: "Appointments List",
      appointments: filteredAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

updateAppointmentsStatus();
setInterval(updateAppointmentsStatus, 1 * 60 * 1000);

const appointmentFilter = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const status = req.query.status;

    if (!req.query.status && req.query.endDate && req.query.startDate) {
      console.log("startDate && endDate");
      const filteredRecords = await Appointment.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records",
        appointmentList: filteredRecords,
      });
    } else if (req.query.status && req.query.startDate && req.query.endDate) {
      console.log("hello status && startDate && endDate ");
      const filteredRecords = await Appointment.findAll({
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      res.status(200).json({
        message: "Filtered records",
        appointmentList: filteredRecords,
      });
    } else if (!req.query.startDate && !req.query.endDate && req.query.status) {
      console.log("status");
      const filteredRecords = await Appointment.findAll({
        where: {
          status,
        },
      });

      res.status(200).json({
        message: "Filtered records",
        appointmentList: filteredRecords,
      });
    } else if (!req.query.status && !req.query.endDate && !req.query.startDate) {
      console.log("no one");
      const appointmentList = await Appointment.findAll({});
      res.status(200).json({
        message: "appointmentList",
        appointmentList,
      });
    }
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const AppointmentsOfDoctor = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const status = req.query.status;
    const veterinarianId = req.params.veterinarianId;

    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    let whereClause = { veterinarianId: veterinarianId };

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      whereClause.createdAt = { [Op.between]: [startDate, endDate] };
    }

    if (status) {
      whereClause.status = status;
    }

    console.log("whereClause:", whereClause);

    const filteredRecords = await Appointment.findAll({ where: whereClause });

    res.status(200).json({
      message: "Filtered records",
      appointments: filteredRecords,
    });
  } catch (error) {
    console.error("Error filtering records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.findAll({});
  res.status(200).send({
    message: "appointments",
    appointments,
  });
};

const getSingleAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.medication !== null && appointment.documentation !== null) {
      const documentationArray = JSON.parse(appointment.documentation || "[]");
      const medications = JSON.parse(appointment.medication || "[]");

      const updatedAppointment = {
        ...appointment.toJSON(),
        documentation: documentationArray,
        medication: medications,
      };

      return res.status(200).json({
        message: "Appointment",
        appointment: updatedAppointment,
      });
    }

    return res.status(200).json({
      message: "Appointment",
      appointment: appointment,
    });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAppointment,
  updateAppointment,
  registerDiagnostic,
  deleteAppointmentRecord,
  appointmentExcelFile,
  updateAppointmentsStatus,
  appointmentFilter,
  AppointmentsOfDoctor,
  dateWiseAppointment,
  getAllAppointments,
  getSingleAppointment,
};
