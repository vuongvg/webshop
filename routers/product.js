const express = require("express");
const { findOneProductBySlugDb, findAllProductsByQueryDb, createProduct } = require("../controllers/productCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.get(
   "/:slug",
   asyncWrapper(async (req, res) => {
      const { total_page, total_products, per_page, page, product, review } = await findOneProductBySlugDb(req.params.slug);
      res.set({ "total-page": total_page, "total-products": total_products, "per-page": per_page, page, "Access-Control-Expose-Headers": "*" });
      res.json({ product, review });
   })
);

router.get(
   "/",
   asyncWrapper(async (req, res) => {
      const { total_page, total_products, per_page, page, list_products, filterSidebar } = await findAllProductsByQueryDb(req.query);
      res.set({ "total-page": total_page, "total-products": total_products, "per-page": per_page, page, "Access-Control-Expose-Headers": "*" });
      res.json({ _total: total_products, list_products, filterSidebar });
   })
);

router.post(
   "/create",
   asyncWrapper(async (req, res) => {
      const result= await createProduct(req.body);
      
      // let result = [];
      // await Promise.all( 
      //    data.map(async(item) => {
      //     await  createProduct(item);
      //    })
      // ).then(res=>result.push(res));
      res.json({_id:result._id});

      // const newProduct = await createProduct();
      // console.log(newProduct._id);
      // res.json({ id: newProduct._id });
   })
);
router.post(
   "/update",
   asyncWrapper(async (req, res) => {
      const result= await createProduct(req.body);
      res.json({_id:result._id});
   })
);

module.exports = router;
