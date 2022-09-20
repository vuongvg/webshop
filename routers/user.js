const express = require("express");
const { findUserById, updateCartListUser, updateWishListUser, updateAddressListUser } = require("../controllers/userCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.get(
   "/",
   asyncWrapper(async (req, res) => {
      const result = await findUserById(req.user._id);
      res.json({ ...result._doc, salt: undefined, hashedPassword: undefined });
   })
);

router.patch(
   "/wishlist/:id",
   asyncWrapper(async (req, res) => {
      const result = await updateWishListUser(req.params.id, req.body);
      res.json(result);
   })
);

router.patch(
   "/cartlist/:id",
   asyncWrapper(async (req, res) => {
      const result = await updateCartListUser(req.params.id, req.body);
      res.json(result);
   })
);

router.patch(
   "/addresslist/:id",
   asyncWrapper(async (req, res) => {
      const result = await updateAddressListUser(req.params.id, req.body);
      res.json(result);
   })
); 
 
module.exports = router; 
 