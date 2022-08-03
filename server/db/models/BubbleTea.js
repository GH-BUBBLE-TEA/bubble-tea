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
});

module.exports = BubbleTea;
