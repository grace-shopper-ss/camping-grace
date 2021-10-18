// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { INTEGER, ENUM } = Sequelize.DataTypes;

// Order model definition
const Order = db.define("order", {
  userId: {
    type: INTEGER,
  },
  status: {
    type: ENUM("pending", "complete"),
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = Order;
