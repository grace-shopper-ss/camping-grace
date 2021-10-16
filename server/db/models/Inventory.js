// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { INTEGER, ENUM } = Sequelize.DataTypes;

// Inventory model definition
const Inventory = db.define("inventory", {
  productId: {
    type: INTEGER,
    allowNull: false
  },
  status: {
    type: ENUM("available", "reserved", "sold"),
    defaultValue: "available",
    allowNull: false,
  },
});

module.exports = Inventory;
