const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  type: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM(
      "Pending",
      "Ordered",
      "Preparing",
      "Shipped",
      "Completed"
    ),
  },
});

module.exports = Order;
