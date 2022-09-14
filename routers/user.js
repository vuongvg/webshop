const express = require("express");
const { findUserById, updateWishlistUser } = require("../controllers/userCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.get(
   "/",
   asyncWrapper(async (req, res) => {
      const result = await findUserById(req.user._id);
      // res.set({ total_users: 1, per_page: 1, total_pages: 1, page: 1 });
      res.json({...result._doc, salt: undefined, hashedPassword: undefined});
   })
);

router.patch(
   "/wishlist/:id",
   asyncWrapper(async (req, res) => {
      const result = await updateWishlistUser(req.params.id, req.body);
      console.log(`  *** result`, result.modifiedCount)
      res.json(result);
   })
);

module.exports = router;
