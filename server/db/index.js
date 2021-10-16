//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Inventory = require("./models/Inventory");
//associations could go here!

Product.hasMany(Inventory, { foreignKey: "productId" });
Inventory.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Inventory,
  },
};
