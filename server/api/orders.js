const router = require("express").Router();
const {
  models: { LineItem, BubbleTea, Order },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
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

    // const resultArray = [];
    const result = await LineItem.findAll({
      where: { orderId: ordersList[0].id },
    });
    // for (let i = 0; i < ordersList.length - 1; i++) {
    //   const orderId = ordersList[i].id;
    //   console.log("orderId: ", orderId);

    //   const result = await LineItem.findAll({
    //     where: { orderId: orderId },
    //   });
    //   resultArray.push([orderId, result]);
    // }

    // console.log("result: ", resultArray);
    // res.json(resultArray);
    res.json(result);
  } catch (e) {
    next(e);
  }
});
