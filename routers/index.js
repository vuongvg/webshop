const express = require("express");
const { authMdw } = require("../middlewares/authMdw");
const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", authMdw, userRouter);
router.use("/product/", productRouter);

module.exports = router;
