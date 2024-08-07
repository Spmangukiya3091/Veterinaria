const { Sequelize, where } = require("sequelize");
const Database = require("../../../config/connection");
const Speciality = Database.speciality;
const Admin = Database.user;
const Veterinarian = Database.veterinarian;
const Appointment = Database.appointment;
const jwt = require("jsonwebtoken")

const createSpeciality = async (req, res) => {
  try {
    const exist = await Speciality.findOne({ where: { speciality: req.body.speciality } });

    if (req.body.speciality === "" || req.body.speciality === null) {
      return res.status(400).json({
        message: "speciality is required",
      });
    }

    if (!exist) {
      const { speciality } = req.body;
      const newSpeciality = await Speciality.create({ speciality });
      return res.status(201).json({
        message: "speciality created",
        result: newSpeciality,
      });
    }

    return res.status(400).json({
      message: "speciality existed",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error speciality creation",
      error: error.message,
    });
  }
};


const updateSpeciality = async (req, res) => {
  try {
    const id = req.params.id;
    const specialityExist = await Speciality.findOne({ where: { id: id } });

    const { speciality } = req.body;

    if (specialityExist) {
      await Speciality.update({ speciality }, { where: { id: id } });
      await Veterinarian.update({ speciality: speciality }, { where: { specialityId: id } });
      res.status(200).send({
        message: "speciality updated successfully",
      });
    } else {
      res.status(404).send({
        message: "speciality not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating speciality",
      error: error.message,
    });
  }
};
const deleteSpeciality = async (req, res) => {
  const id = req.params.id;
  const speciality = await Speciality.findOne({ where: { id: id } });
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
  if (speciality?.id === id) {
    await Speciality.destroy({ where: { id: id } });
    await Veterinarian.destroy({ where: { specialityId: id } })
    const vets = await Veterinarian.findAll({ where: { specialityId: id } });
    const veterinarianIds = vets.map((vet) => vet.id);
    await Appointment.destroy({
      where: {
        veterinarianId: {
          [Sequelize.Op.in]: veterinarianIds,
        },
      },
    });
    return res.status(200).send({
      message: "speciality deleted successfully",
      success: true,
    });
  } else {
    return res.status(404).send({
      message: "speciality record not found",
      success: false,
    });
  }
};

const getAllSpecialities = async (req, res) => {
  const specialityList = await Speciality.findAll({ order: [["createdAt", "DESC"]], });
  res.status(200).send({
    message: "specialityList",
    specialityList,
  });
};

const getSingleSpeciality = async (req, res) => {
  const id = req.params.id;
  const speciality = await Speciality.findOne({ where: { id: id } });
  res.status(200).send({
    message: "speciality",
    speciality,
  });
};
const getVeterinariansBySpeciality = async (req, res) => {
  try {
    const specialities = await Speciality.findAll({
      include: {
        model: Veterinarian,
        as: "specialityData",
      },
      attributes: [
        "id",
        "speciality",
        "createdAt",
        [Sequelize.fn("COUNT", Sequelize.col("specialityData.id")), "veterinarianCount"],
        [Sequelize.fn("MIN", Sequelize.col("specialityData.id")), "veterinarianId"],
        // [Sequelize.fn("ANY_VALUE", Sequelize.col("specialityData.id")), "veterinarianId"],
        // Include other non-aggregated columns in the GROUP BY clause
      ],
      group: [
        "speciality.id",
        "speciality.speciality",
        "speciality.createdAt",
        "specialityData.id", // Include "specialityData.id" in the GROUP BY clause
        "specialityData.avatar",
        "specialityData.name",
        "specialityData.surname",
        // Add other non-aggregated columns from Veterinarian model here
      ],
    });

    res.status(200).send({
      message: "specialities",
      specialities: specialities.map((ele) => ({
        id: ele.id,
        speciality: ele.speciality,
        createdAt: ele.createdAt,
        veterinarianCount: ele.specialityData.length,
        veterinarianId: ele.veterinarianId,
        // Add other non-aggregated columns from Veterinarian model here
      })),
    });
  } catch (error) {
    console.error("Error fetching speciality data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
  getAllSpecialities,
  getSingleSpeciality,
  getVeterinariansBySpeciality,
};
