const express = require("express");
const {  findProductsHint } = require("../controllers/searchHintCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.get("/", asyncWrapper(async (req, res) => {
      const products=await findProductsHint(req.query.keysearch)
      res.json(products);
   })
);

module.exports = router;
