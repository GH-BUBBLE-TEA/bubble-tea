//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const BubbleTea = require("./models/BubbleTea");
const LineItem = require("./models/LineItem");
const Order = require("./models/Order");
//const { useReducer } = require("react");

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(BubbleTea, { through: LineItem });
BubbleTea.belongsToMany(Order, { through: LineItem });

module.exports = {
  db,
  models: {
    User,
    BubbleTea,
    LineItem,
    Order,
  },
};
