const router = require("express").Router();
const {
  models: { Order, OrderedProduct },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    res.send(
      await Order.findOne({
        where: { userId: req.params.id, status: "pending" },
        include: OrderedProduct,
      }).then((res) => res.orderedproducts)
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
