// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { UUID, ENUM } = Sequelize.DataTypes;

// Inventory model definition
const Inventory = db.define("inventory", {
  id: {
    type: UUID,
    unique: true,
    allowNull: false,
  },
  // foreign key predefined, since we will seed an inventory with product references
  productId: {  
    type: UUID,
    allowNull: false,
  },
  status: {
    type: ENUM("available", "reserved", "sold"),
    defaultValue: "available",
    allowNull: false,
  },
});

module.exports = Inventory;
