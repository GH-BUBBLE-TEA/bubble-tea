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
      type: Sequelize.ENUM("milk tea", "fruit tea", "latte"),
    },
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://d3q0fpse3wbo5h.cloudfront.net/production/uploads/innovations/kung_fu_bubble_tea.jpg",
  },
  defaultPrice: {
    type: Sequelize.DECIMAL,
    defaultValue: 10,
  },
  description: {
    type: Sequelize.TEXT,
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  sugarLevel: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM(
        "No Sugar",
        "25% Sugar",
        "50% Sugar",
        "75% Sugar",
        "100% Sugar"
      ),
    },
    defaultValue: "100% Sugar",
  },
  size: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM("M", "L"),
      defaultValue: "M",
    },
  },
  iceOrHot: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM(
        "No Ice",
        "Less Ice",
        "Regular Ice",
        "Hot",
        "More Ice"
      ),
    },
    defaultValue: "Regular Ice",
  },
  alcohol: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM("Vodka", "Rum", "Gin", "Tequila", "Whiskey", "None"),
    },
    defaultValue: "None",
  },
  toppings: {
    type: Sequelize.STRING,
    status: {
      type: Sequelize.ENUM(
        "Tapioca",
        "Pudding",
        "Grass Jelly",
        "Coconut Jelly",
        "Lychee Jelly",
        "Red Bean",
        "Aloe Vera",
        "None"
      ),
    },
    defaultValue: "None",
  },
});

module.exports = BubbleTea;
