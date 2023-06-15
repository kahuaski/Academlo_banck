const { db } = require("../database/configdb");

const { DataTypes } = require("sequelize");
//const { db } = require("../database/configdb");
//ramdon

const User = db.define("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1000,
  },

  status: {
    type: DataTypes.ENUM("activated", "disabled"),
    allowNull: false,
    defaultValue: "activated",
  },
});
module.exports = User;
