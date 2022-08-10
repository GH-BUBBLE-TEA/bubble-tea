const router = require("express").Router();
const {
  models: { User, LineItem, BubbleTea, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization)
    if (userAuth.isAdmin) {
      const users = await User.findAll({
        attributes: ["id", "username", "email", "isAdmin"],
      });
      res.json(users);
    } else {
      alert("unauthorized user!");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization)
      if (userAuth) {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } else {
      alert("unauthorized user!");
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization)
    if (userAuth) {
      const user = await User.findByPk(req.params.id);
      res.send(await user.update(req.body));
    } else {
      alert("unauthorized user!");
    }
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const userAuth = await User.findByToken(req.headers.authorization)
    if (userAuth.isAdmin) {
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      res.send(user);
    } else {
      alert("unauthorized user!");
    }
  } catch (error) {
    next(error);
  }
});
