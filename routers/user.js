const express = require("express");
const { findUserById } = require("../controllers/userCtrl");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const router = express.Router();

router.get("/:id", asyncWrapper(async (req, res) => {
   const result= await findUserById(req.params.id)
      res.set({ total_users: 1, per_page: 1, total_pages: 1, page: 1 });
      res.json(result);
   })
);

module.exports = router;
