const express = require("express");
const { homeCtrl } = require("../controllers/homeCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.get(
   "/",
   (async (req, res) => {
      console.log(`  *** home`);
      const result = await homeCtrl();
      res.json(result);
   })
);

module.exports = router;
