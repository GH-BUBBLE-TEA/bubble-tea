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
