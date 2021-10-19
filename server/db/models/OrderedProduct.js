// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatype
const { INTEGER } = Sequelize.DataTypes;

// OrderedProduct model definition
const OrderedProduct = db.define("orderedproduct", {
  orderId: {
    type: INTEGER,
  },
  inventoryId: {
    type: INTEGER,
  },
  productId: {
    type: INTEGER,
  },
});

module.exports = OrderedProduct;
