const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  teaName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  bubble: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  jelly: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  alcohol: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  cream: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Order;
