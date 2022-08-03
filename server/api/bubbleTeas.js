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

router.get("/:id", async (req, res, next) => {
  try {
      const bubbleTea = await BubbleTea.findByPk(req.params.id)
      res.json(bubbleTea)
  } catch (e) {
      next(e)
  }
})
