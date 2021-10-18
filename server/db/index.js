//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Inventory = require("./models/Inventory");
const Order = require("./models/Order");
//associations could go here!

Product.hasMany(Inventory, { foreignKey: "productId" });
Inventory.belongsTo(Product, { foreignKey: "productId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Inventory,
    Order
  },
};
