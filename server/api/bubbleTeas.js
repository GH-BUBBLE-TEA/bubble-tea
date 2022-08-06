const router = require("express").Router();
const {
  models: { BubbleTea },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const bubbleTeas = await BubbleTea.findAll();
    res.json(bubbleTeas);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
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
