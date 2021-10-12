// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { STRING, DECIMAL } = Sequelize.DataTypes;

// Product model definition
const Product = db.define("product", {
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
    defaultValue: "https://images.cdn1.stockunlimited.net/illustration/teepee-tent_1558083.png",
  },
});

module.exports = Product;
