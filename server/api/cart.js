const router = require("express").Router();
const {
  models: { Order, OrderedProduct, Inventory },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.params.id, status: "pending" },
    });
    const cart = await OrderedProduct.findAll({
      where: {
        orderId: order.id,
      },      
    });
    
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
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

router.put("/order/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    
    console.log(order)
    order.status = 'complete';
    res.status(200).send(await order.update(order));
  } catch(error) {
    next(error);
  }
});

module.exports = router;
