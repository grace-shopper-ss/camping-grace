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

router.get("/:order/:item", async (req, res, next) => {
  try {
    const cart = await OrderedProduct.findOne({
      where: {
        orderId: req.params.order,
        inventoryId: req.params.item,
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

router.delete("/:order/:item", async (req, res, next) => {
  try {
    const product = await OrderedProduct.findOne({
      where: { orderId: req.params.order * 1, inventoryId: req.params.item },
    });
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
