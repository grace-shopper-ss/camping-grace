// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { STRING, ENUM } = Sequelize.DataTypes;

// Inventory model definition
const Inventory = db.define("inventory", {
  product: {
    type: STRING,
    allowNull: false
  },
  status: {
    type: ENUM("available", "reserved", "sold"),
    defaultValue: "available",
    allowNull: false,
  },
});

module.exports = Inventory;
