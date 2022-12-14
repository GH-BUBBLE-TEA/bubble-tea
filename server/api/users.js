const router = require("express").Router();
const {
  models: { User, LineItem, BubbleTea, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization);
    if (userAuth.isAdmin) {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "isAdmin"],
      });
      res.json(users);
    } else {
      console.error("unauthorized user!");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization);
    if (userAuth) {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } else {
      console.error("unauthorized user!");
    }
  } catch (e) {
    next(e);
  }
});

// router.get("/:userId", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     if (user) {
//       const ordersList = await Order.findAll({
//         where: {
//           userId: +req.params.userId,
//           status: {
//             [Op.ne]: "Pending",
//           },
//         },
//       });
//       const result = ordersList.map((order) => {
//         return {
//           orderId: order.id,
//           status: order.status,
//         };
//       });
//       res.json(result);
//     } else {
//       console.error("Sorry, user unauthorized!");
//     }
//   } catch (e) {
//     next(e);
//   }
// });

router.put("/:id", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization);
    if (userAuth) {
      const user = await User.findByPk(req.params.id);
      res.send(await user.update(req.body));
    } else {
      console.error("unauthorized user!");
    }
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization);
    if (userAuth.isAdmin) {
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      res.send(user);
    } else {
      console.error("unauthorized user!");
    }
  } catch (error) {
    next(error);
  }
});
