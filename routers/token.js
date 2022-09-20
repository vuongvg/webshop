const express = require("express");
const { refreshTokenCtrl, removeTokenCtrl } = require("../controllers/tokenCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.post(
   "/",
   asyncWrapper(async (req, res) => {
      const result = await refreshTokenCtrl(req.body.refreshToken);
      res.status(201).json(result); 
   })
);
router.delete(
   "/:token",
   asyncWrapper(async (req, res) => {
      const result = await removeTokenCtrl(req.params.token);
      res.status(200).json(result); 
   })
);

module.exports = router;
