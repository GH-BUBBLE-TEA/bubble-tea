const router = require("express").Router();
const {
  models: { LineItems, BubbleTea },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const lineItems = await LineItems.findAll();
    //status pending, user id
    res.json(lineItems);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newLineItems = await LineItems.create({
      quantity: 1,
      orderId: 1,
      bubbleTeaId: 1,
      include: {
        model: BubbleTea,
        where: { bubbleTeaId: req.params.id },
      },
    });
    res.status(201).send(newLineItems);
  } catch (err) {
    next(err);
  }
});
