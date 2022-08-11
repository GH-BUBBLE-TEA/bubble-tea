const router = require("express").Router();
const {
  models: { LineItem, BubbleTea, Order, User },
} = require("../db");
const { Op } = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.isAdmin) {
      const ordersList = await Order.findAll({
        where: {
          status: {
            [Op.ne]: "Pending",
          },
        },
        include: {
          model: User,
          attributes: ["username"],
        },
      });
      res.json(ordersList);
    } else {
      console.error("Sorry, user unauthorized!");
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const ordersList = await Order.findAll({
        where: {
          userId: +req.params.userId,
          status: {
            [Op.ne]: "Pending",
          },
        },
      });
      const result = ordersList.map((order) => {
        return {
          orderId: order.id,
          status: order.status,
        };
      });
      res.json(result);
    } else {
      console.error("Sorry, user unauthorized!");
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/:orderId", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const lineItems = await LineItem.findAll({
        where: { orderId: +req.params.orderId },
      });
      res.json(lineItems);
    } else {
      console.error("Sorry, user unauthorized!");
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:orderId", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const order = await Order.findByPk(req.params.orderId);
      res.send(await order.update({ status: "Ordered" }));
    } else {
      console.error("Sorry, user unauthorized!");
    }
  } catch (e) {
    next(e);
  }
});
