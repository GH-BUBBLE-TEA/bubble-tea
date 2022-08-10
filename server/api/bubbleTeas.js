const router = require("express").Router();
const {
  models: { BubbleTea },
} = require("../db");
module.exports = router;
const { Op } = require("sequelize");
const LineItem = require("../db/models/LineItem");

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
    console.log("REQ.BODY: ", req.body);
    res.status(201).json(await BubbleTea.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const bubbleTea = await BubbleTea.findByPk(req.params.id);
    res.send(await bubbleTea.update(req.body));
  } catch (error) {
    next(error);
  }
});
// router.put("/updateStock/:id", async (req, res, next) => {
//   try {
//     const bubbleTea = await BubbleTea.findByPk(req.params.id);
//     const updateStock = await bubbleTea.update({
//       stock: req.body.updatedStock,
//     });
//     res.send(updateStock);
//   } catch (error) {
//     next(error);
//   }
// });

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
    const bubbleTea = await BubbleTea.findByPk(req.params.id);
    await bubbleTea.destroy();
    res.send(bubbleTea);
  } catch (error) {
    next(error);
  }
});
