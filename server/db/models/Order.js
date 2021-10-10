// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { UUID, ENUM } = Sequelize.DataTypes;

// Order model definition
const Order = db.define("order", {
  id: {
    type: UUID,
    unique: true,
    allowNull: false,
  },
  status: {
    type: ENUM('pending', 'complete'),
    allowNull: false,
    defaultValue: 'pending'
  }
});

module.exports = Order;