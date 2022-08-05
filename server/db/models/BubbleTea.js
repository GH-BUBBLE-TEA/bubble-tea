const Sequelize = require("sequelize");
const db = require("../db");

const BubbleTea = db.define("bubbleTea", {
  teaName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  teaCategories: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM("Milk Tea", "Fruit Tea", "Latte"),
    },
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://cdn.pixabay.com/photo/2021/02/11/19/03/bubble-tea-6006193__340.png",
  },
  defaultPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
  // sugarLevel: {
  //   type: Sequelize.STRING,
  //   // status: {
  //   //   type: Sequelize.ENUM(
  //   //     "No Sugar",
  //   //     "25% Sugar",
  //   //     "50% Sugar",
  //   //     "75% Sugar",
  //   //     "100% Sugar"
  //   //   ),
  //   // },
  //   defaultValue: "100% Sugar",
  // },
  // size: {
  //   type: Sequelize.STRING,
  //   // status: {
  //   //   type: Sequelize.ENUM("M", "L"),
  //   // },
  //   defaultValue: "M",
  // },
  // iceOrHot: {
  //   type: Sequelize.STRING,
  //   // status: {
  //   //   type: Sequelize.ENUM(
  //   //     "No Ice",
  //   //     "Less Ice",
  //   //     "Regular Ice",
  //   //     "Hot",
  //   //     "More Ice"
  //   //   ),
  //   // },
  //   defaultValue: "Regular Ice",
  // },
  // alcohol: {
  //   type: Sequelize.STRING,
  //   status: {
  //     type: Sequelize.ENUM("Vodka", "Rum", "Gin", "Tequila", "Whiskey", "None"),
  //   },
  //   defaultValue: "None",
  // },
  // toppings: {
  //   type: Sequelize.STRING,
  //   // status: {
  //   //   type: Sequelize.ENUM(
  //   //     "Tapioca",
  //   //     "Pudding",
  //   //     "Grass Jelly",
  //   //     "Coconut Jelly",
  //   //     "Lychee Jelly",
  //   //     "Red Bean",
  //   //     "Aloe Vera",
  //   //     "None"
  //   //   ),
  //   // },
  //   defaultValue: "None",
  // },
});

module.exports = BubbleTea;
