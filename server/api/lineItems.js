const router = require("express").Router();
const {
  models: { LineItems, BubbleTea, User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const lineItems = await LineItems.findAll();
    //status pending, user id
    res.json(lineItems);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  console.log("req.body: ", req.body);
  // req.body.bubbleTea = {
  //   id: 1,
  //   defaultPrice: "15",
  // };
  try {
    const bubbleTea = req.body;
    const user = await User.findByToken(req.headers.authorization);
    const order = await Order.findOne({
      where: {
        userId: user.id,
        status: "Pending",
      },
    });

    if (order) {
      const duplicate = await LineItems.findOne({
        where: {
          orderId: order.id,
          bubbleTeaId: bubbleTea.id,
        },
      });

      if (duplicate) {
        duplicate.quantity++;
        await duplicate.save();
        res.status(201).json(duplicate);
      } else {
        const newLineItems = await LineItems.create({
          orderId: order.id,
          bubbleTeaId: bubbleTea.id,
          itemPrice: bubbleTea.defaultPrice,
          quantity: 1,
          //totalPrice: itemPrice * quantity,
        });
        res.status(201).json(newLineItems);
      }
    } else {
      const newOrder = await Order.create({
        userId: user.id,
      });
      const newLineItems = await LineItems.create({
        orderId: newOrder.id,
        bubbleTeaId: bubbleTea.id,
        itemPrice: bubbleTea.defaultPrice,
        quantity: 1,
        //totalPrice: itemPrice * quantity,
      });
      res.status(201).json(newLineItems);
    }
  } catch (err) {
    next(err);
  }
});
