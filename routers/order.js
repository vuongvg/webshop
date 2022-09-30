const express = require("express");
const { createOrder, findAllOrder } = require("../controllers/orderCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.post(
   "/",
   asyncWrapper(async (req, res) => {
      const result = await createOrder(req.body);
      res.status(201).json(result._id);
   })
);

// router.get('/:slug',asyncWrapper(async(req,res)=>{
//     const reviews= await findReviewBySlugProduct(req.params.slug)
//     res.json(reviews)
// }))

router.get(
   "/",
   asyncWrapper(async (req, res) => {
      const result = await findAllOrder(req.user._id);
      res.json(result);
   })
);

module.exports = router;
