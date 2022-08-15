const express = require("express");
const { loginCtrl, registerCtrl } = require("../controllers/authCtrl");
const { catchErrorMdw } = require("../middlewares/catchErrorMdw");
const { validateUserMdw } = require("../middlewares/validateUserMdw");

const router = express.Router();

router.post("/login",validateUserMdw,catchErrorMdw(401,async (req, res) => {
      const token =await loginCtrl(req.body.email,req.body.password);
      res.json({token});
}));

router.post("/register", validateUserMdw, catchErrorMdw(401,async (req, res) => {
      const result = await registerCtrl(req.body.email, req.body.password);
      res.json({ infoUser: { _id: result.insertedId, email: req.body.email } });
}));

module.exports = router;
