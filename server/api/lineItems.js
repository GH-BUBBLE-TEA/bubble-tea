const router = require("express").Router();
const {
  models: { LineItem, BubbleTea, User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await Order.findOne({
      where: {
        userId: user.id,
        status: "Pending",
      },
    });
    if (!order) {
      res.send("there is no item in the cart");
    } else {
      const lineItem = await LineItem.findAll({
        where: {
          orderId: order.id,
        },
        // include: [
        //   {
        //     model: BubbleTea,
        //   },
        // ],
      });

      // const cart = Order.findByPk(order.id, {
      //   include: [{ model: LineItem, include: [BubbleTea] }],
      // });
      res.status(200).send(lineItem);
    }
  } catch (err) {
    next(err);
  }
});

// router.get("/", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     const order = await Order.findOne({
//       where: {
//         userId: user.id,
//         status: "Pending",
//       },
//     });
//     if (!order) {
//       res.send("there is no item in the cart");
//     } else {
//       const lineItems = await LineItems.findAll({
//         where: {
//           orderId: order.id,
//         },
//       });
//       res.status(200).send(lineItems);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

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
      const duplicate = await LineItem.findOne({
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
        const newLineItems = await LineItem.create({
          orderId: order.id,
          bubbleTeaId: bubbleTea.id,
          itemPrice: bubbleTea.defaultPrice,
          quantity: 1,
          teaName: bubbleTea.teaName,
          //totalPrice: itemPrice * quantity,
        });
        res.status(201).json(newLineItems);
      }
    } else {
      const newOrder = await Order.create({
        userId: user.id,
      });
      const newLineItems = await LineItem.create({
        orderId: newOrder.id,
        bubbleTeaId: bubbleTea.id,
        itemPrice: bubbleTea.defaultPrice,
        quantity: 1,
        teaName: bubbleTea.teaName,
        //totalPrice: itemPrice * quantity,
      });
      res.status(201).json(newLineItems);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:bubbleTeaId", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await Order.findOne({
      where: {
        userId: user.id,
        status: "Pending",
      },
    });
    const lineItem = await LineItem.findOne({
      bubbleTeaId: req.params.bubbleTeaId,
      orderId: order.id,
    });
    await lineItem.destroy();
    res.json(lineItem);
  } catch (error) {
    next(error);
  }
});
