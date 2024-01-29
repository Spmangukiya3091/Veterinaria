const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define("owner", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNULL: false,
      
      },
      dob:{
        type: DataTypes.DATE,
        allowNULL: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      phone_1: {
        type: DataTypes.BIGINTEGER,
        allowNULL: false,
      },  phone_2: {
        type: DataTypes.BIGINTEGER,
        allowNULL: false,
      },
      doc_identity: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNULL: false,
      },
  
    });
   
   
    return Owner;
  };
  