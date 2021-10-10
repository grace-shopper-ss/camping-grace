// import modules and db connection
const Sequelize = require("sequelize");
const db = require("../db");

// destructure datatypes
const { STRING, UUID } = Sequelize.DataTypes;

// Category model definition
const Category = db.define("category", {
  id: {
    type: UUID,
    unique: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Category;