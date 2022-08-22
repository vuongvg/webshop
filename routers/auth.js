const express = require("express");
const { loginCtrl, registerCtrl } = require("../controllers/authCtrl");
const { catchErrorMdw } = require("../middlewares/catchErrorMdw");

const router = express.Router();

router.post("/login",catchErrorMdw(400,async (req, res) => {
      const data =await loginCtrl(req.body.email,req.body.password);
      console.log(`  *** data`, data)
      res.json(data);
}));

router.post("/register", catchErrorMdw(400,async (req, res) => {
      const result = await registerCtrl(req.body.email, req.body.password);
      res.json({ infoUser: { _id: result.insertedId, email: req.body.email } });
}));

module.exports = router; 
