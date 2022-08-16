const express = require("express");
const { userCtrl } = require("../controllers/userCtrl");
const { catchErrorMdw } = require("../middlewares/catchErrorMdw");
const router = express.Router();

router.get("/",catchErrorMdw(401, async (req, res) => {
      const { total_users, per_page, total_pages, list_users, page } = await userCtrl(req.query);
      res.set({ total_users, per_page, total_pages, page });
      res.json(list_users);
   })
);

module.exports = router;
 