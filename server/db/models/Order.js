const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM(
      "Pending",
      "Ordered",
      "Preparing",
      "Shipped",
      "Completed"
    ),
    defaultValue: "Pending",
  },
});

module.exports = Order;
