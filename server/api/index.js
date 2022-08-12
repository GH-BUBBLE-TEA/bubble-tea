const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  models: { LineItem, Order, User },
} = require("../db");

module.exports = router;

router.use("/users", require("./users"));

router.use("/bubbleTeas", require("./bubbleTeas"));

router.use("/lineItems", require("./lineItems"));
router.use("/orders", require("./orders"));

router.post("/checkout", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user) {
      const order = await Order.findOne({
        where: {
          userId: user.id,
          status: "Pending",
        },
      });

      const lineItems = await LineItem.findAll({
        where: {
          orderId: order.id,
        },
      });

      let grandTotal = 0;
      lineItems.map((lineItem) => {
        grandTotal += lineItem.quantity * lineItem.itemPrice;
      });

      const charge = await stripe.charges.create({
        amount: grandTotal * 100,
        currency: "usd",
        source: req.body.stripeId,
        metadata: { order_id: order.id },
      });

      res.send(await order.update({ status: "Ordered" }));
    } else {
      console.error("Sorry, user unauthorized!");
    }
  } catch (e) {
    next(e);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
