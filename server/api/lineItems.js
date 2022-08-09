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
    if (order) {
      const lineItems = await LineItem.findAll({
        where: {
          orderId: order.id,
        },
      });
      res.status(200).send(lineItems);
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
      });
      res.status(201).json(newLineItems);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.id);
    await lineItem.destroy();
    res.send(lineItem);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedItem = await LineItem.findByPk(req.params.id);
    res.send(await updatedItem.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.id);
    res.status(200).send(lineItem);
  } catch (err) {
    next(err);
  }
});
