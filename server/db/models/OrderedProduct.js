// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatype
const { UUID } = Sequelize.DataTypes;

// OrderedProduct model definition
const OrderedProduct = db.define("order", {
  id: {
    type: UUID,
    unique: true,
    allowNull: false,
  }
})