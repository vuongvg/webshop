const express = require("express");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.get("/", asyncWrapper(async (req, res) => {
      res.set({ total_users: 1, per_page: 1, total_pages: 1, page: 1 });
      res.json(req.user);
   })
);

module.exports = router;
