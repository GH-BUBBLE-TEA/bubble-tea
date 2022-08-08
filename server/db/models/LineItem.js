const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineItem", {
  itemPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  teaName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://cdn.pixabay.com/photo/2021/02/11/19/03/bubble-tea-6006193__340.png",
  },
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = LineItem;
