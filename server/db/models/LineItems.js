const Sequelize = require("sequelize");
const db = require("../db");

const LineItems = db.define("lineItems", {
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
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
});

module.exports = LineItems;
