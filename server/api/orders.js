const router = require("express").Router();
const {
  models: { LineItem, BubbleTea, Order },
} = require("../db");
const { Op } = require("sequelize");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const ordersList = await Order.findAll({});
    res.json(ordersList);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
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
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/:orderId", async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll({
      where: { orderId: +req.params.orderId },
    });
    res.json(lineItems);
  } catch (e) {
    next(e);
  }
});

router.put("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    res.send(await order.update({ status: "Ordered" }));
  } catch (e) {
    next(e);
  }
});
