const router = require("express").Router();
const {
  models: { BubbleTea },
} = require("../db");
module.exports = router;
const { Op } = require("sequelize");
const LineItem = require("../db/models/LineItem");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
  try {
    const bubbleTeas = await BubbleTea.findAll({
      where: {
        stock: { [Op.gt]: 0 },
      },
    });
    res.json(bubbleTeas);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.isAdmin) {
      res.status(201).json(await BubbleTea.create(req.body));
    } else {
      alert("Sorry, this is only for administrator user!");
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.isAdmin) {
      const bubbleTea = await BubbleTea.findByPk(req.params.id);
      res.send(await bubbleTea.update(req.body));
    } else {
      alert("Sorry, this is only for administrator user!");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const bubbleTea = await BubbleTea.findByPk(req.params.id);
    res.json(bubbleTea);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.isAdmin) {
      const bubbleTea = await BubbleTea.findByPk(req.params.id);
      await bubbleTea.destroy();
      res.send(bubbleTea);
    } else {
      alert("Sorry! You are unauthorized");
    }
  } catch (error) {
    next(error);
  }
});
