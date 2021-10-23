const router = require("express").Router();
const {
  models: { Order, OrderedProduct, Inventory },
} = require("../db");

router.get("/:order", async (req, res, next) => {
  try {
    const cart = await OrderedProduct.findAll({
      where: {
        orderId: req.params.order,
      },
    });

    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/:order", async (req, res, next) => {
  try {
    res.status(201).send(await OrderedProduct.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/product/:id", async (req, res, next) => {
  try {
    const soldProduct = await Inventory.findByPk(req.params.id);
    res.status(200).send(await soldProduct.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
