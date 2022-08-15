const express = require("express");
const { productCtrl ,productsFilterCtrl} = require("../controllers/productCtrl");
const { catchErrorMdw } = require("../middlewares/catchErrorMdw");
const router = express.Router();

router.get("/:slug", catchErrorMdw(400,async(req, res) => {
      const { total_page, total_products, per_page, page, product } =await productCtrl(req.params.slug);
      res.set({'total-page': total_page, 'total-products':total_products, 'per-page':per_page, page ,'Access-Control-Expose-Headers': '*'});
      res.json(product);
}));

router.get("/", catchErrorMdw(400,async (req, res) => {
      const { total_page, total_products, per_page, page, list_products, filterSidebar } = await productsFilterCtrl(req.query);
      res.set({'total-page': total_page, 'total-products':total_products, 'per-page':per_page, page ,'Access-Control-Expose-Headers': '*'});
      res.json({_total:total_products,list_products,filterSidebar});
})); 

module.exports = router;
