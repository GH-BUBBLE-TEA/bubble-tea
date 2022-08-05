const router = require("express").Router();
const {
  models: { LineItems, BubbleTea, User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log("user: ", user);
    const order = await Order.findOne({
      where: {
        userId: user.id,
        status: "Pending",
      },
    });
    if (!order) {
      res.send("there is no item in the cart");
    } else {
      console.log("orderId: ", order.id);
      const lineItems = await LineItems.findAll({
        where: {
          orderId: order.id,
        },
      });
      console.log("cart:", lineItems);
      res.status(200).send(lineItems);
    }
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  console.log("req.body: ", req.body);
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
