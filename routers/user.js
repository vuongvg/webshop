const express = require("express");
const { catchErrorMdw } = require("../middlewares/catchErrorMdw");
const router = express.Router();

router.get( "/",catchErrorMdw(401, async (req, res) => {
      res.set({ total_users: 1, per_page: 1, total_pages: 1, page: 1 });
      res.json(req.user);
   })
);

module.exports = router;
