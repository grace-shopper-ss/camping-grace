//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Inventory = require("./models/Inventory");

const { products, inventories } = require("./data/data");

//associations could go here!

Product.belongsTo(Inventory)
Inventory.hasMany(Product)

module.exports = {
  db,
  models: {
    User,
    Product,
    Inventory
  },
  products,
  inventories
};
