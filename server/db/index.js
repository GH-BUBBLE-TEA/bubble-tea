//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const BubbleTea = require("./models/BubbleTea");
const LineItems = require("./models/LineItems");
const Order = require("./models/Order");
//const { useReducer } = require("react");

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(BubbleTea, { through: LineItems });
BubbleTea.belongsToMany(Order, { through: LineItems });

module.exports = {
  db,
  models: {
    User,
    BubbleTea,
    LineItems,
    Order,
  },
};
