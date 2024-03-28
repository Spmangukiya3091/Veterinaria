module.exports = (sequelize, DataTypes) => {
  const Speciality = sequelize.define("speciality", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: false, // Corrected typo
    }
  });

  return Speciality;
};
