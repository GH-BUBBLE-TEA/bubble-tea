const router = require("express").Router();
const {
  models: { BubbleTeas },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const bubbleTeas = await BubbleTeas.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    });
    res.json(bubbleTeas);
  } catch (err) {
    next(err);
  }
});
