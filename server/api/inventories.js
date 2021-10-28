const router = require("express").Router();
const {
  models: { Inventory },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const inventories = await Inventory.findAll();
    res.json(inventories);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    res.send( await Inventory.findByPk(req.params.id) );
  }
  catch(err){
    next(err)
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Inventory.findByPk(req.params.id);
    res.status(200).send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
