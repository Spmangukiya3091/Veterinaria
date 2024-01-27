const { Sequelize } = require("sequelize");
const Database = require("../../../config/connection");
const Speciality = Database.speciality;
const Admin = Database.user;
const Veterinarian = Database.veterinarian;
const jwt = require("jsonwebtoken")

const createSpeciality = async (req, res) => {
  try {
    const exist = await Speciality.findOne({});

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

    return res.status(201).json({
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
  const specialityList = await Speciality.findAll({});
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
    const speciality = await Speciality.findAll({
      include: {
        model: Veterinarian,
        as: "specialityData",
      },
      attributes: [
        "id",
        "speciality",
        "createdAt",
        [
          Sequelize.fn("COUNT", Sequelize.col("specialityData.id")),
          "veterinarianCount",
        ],
      ],
      group: ["Speciality.id", "Speciality.speciality"],
    });

    res.status(200).send({
      message: "specialities",
      specialities: speciality.map((ele) => ({
        id: ele.id,
        speciality: ele.speciality,
        createdAt: ele.createdAt,
        veterinarianCount: ele.specialityData.length,
      })),
    });
  } catch (error) {
    console.error("Error fetching category data:", error);
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
