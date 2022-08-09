const router = require("express").Router();
const {
  models: { User, LineItem, BubbleTea, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "email", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/orders/:id", async (req, res, next) => {
  try {
    const ordersList = await Order.findAll({
      where: { userId: +req.params.id },
    });
    //const orderId = ordersList[0].id;
    console.log("orders in API: ", ordersList);
    // const result = await Promise.all(
    //   ordersList.map(async (order) => {
    //     await LineItem.findAll({
    //       where: { orderId: order.id },
    //     });
    //   })
    // );

    const resultArray = [];
    // const result = await LineItem.findAll({
    //   where: { orderId: ordersList[0].id },
    // });
    for (let i = 0; i < ordersList.length - 1; i++) {
      const orderId = ordersList[i].id;
      console.log("orderId: ", orderId);

      const result = await LineItem.findAll({
        where: { orderId: orderId },
      });
      resultArray.push([orderId, result]);
    }

    console.log("result: ", await resultArray);
    res.json(await resultArray);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
