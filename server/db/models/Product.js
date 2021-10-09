// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { STRING, UUID, DECIMAL } = Sequelize.DataTypes;

// Product model definition
const Product = db.define("product", {
  id: {
    type: UUID,
    unique: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: DECIMAL,
    allowNull: false,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    defaultValue: "placeholder",
  },
});

module.exports = Product;
