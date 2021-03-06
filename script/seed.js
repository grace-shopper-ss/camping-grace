"use strict";

const {
  db,
  models: { User, Product, Inventory, Order },
} = require("../server/db");

const { products, inventories } = require("../server/db/data/data");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", type: "member" }),
    User.create({ username: "murphy", password: "123", type: "member" }),
    User.create({ username: "Stephen", password: "123", type: "admin" }),
    User.create({ username: "Spencer", password: "123", type: "admin" }),
  ]);
  
   // Creating Orders
   await Promise.all([
    Order.create({ userId: 1, status: "pending" }),
    Order.create({ userId: 2, status: "pending" }),
    Order.create({ userId: 3, status: "pending" }),
    Order.create({ userId: 4, status: "pending" }),
  ]);

  // Creating Products
  await Promise.all(
    products.map((product) => {
      Product.create({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
      });
    })
  );

  // Creating Inventory
  await Promise.all(
    inventories.map((inventory) => {
      Inventory.create({
        productId: inventory.productId,
        status: inventory.status,
      });
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
