const router = require("express").Router();
const {
  models: { Order },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(
      await Order.findOne({
        where: { userId: req.params.id * 1, status: "pending" },
      })
    );
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const currentOrder = await Order.findOne({
      where: { userId: req.params.id * 1, status: "pending" },
    });

    res.status(200).send(await currentOrder.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Order.create(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
