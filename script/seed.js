"use strict";

const {
  db,
  models: { User, BubbleTea },
} = require("../server/db");
const dummyData = require("./dummydata");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  //add dummy data

  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      isAdmin: true,
      email: "cody@123.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy@123.com",
    }),
  ]);
  /*
  const bubbleTeas = await Promise.all([
    BubbleTea.create({
      teaName: "Signature Alcohol Bubble Tea",
      defaultPrice: "15",
      teaCategories: "Milk Tea",
      stock: 2,
      description: "This is our signature bubble tea with rum!",
    }),
    BubbleTea.create({
      teaName: "Mango Vodka Green Tea",
      defaultPrice: "20",
      teaCategories: "Fruit Tea",
      stock: 3,
      description: "This is our signature fruit tea with Vodka!",
    }),
    BubbleTea.create({
      teaName: "Macha latte",
      defaultPrice: "10",
      teaCategories: "Latte",
      stock: 4,
      description: "This is our signature latte",
    }),
  ]);
  */

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    bubbleTeas: await Promise.all(
      dummyData.map((tea) => {
        return BubbleTea.create(tea);
      })
    ),
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
