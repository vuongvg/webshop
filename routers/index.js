const express = require("express");
const { authMdw, requireAdminMdw } = require("../middlewares/authMdw");
const authRouter = require("./auth");
const userRouter = require("./user");
const crawlRouter = require("./crawl");
const productRouter = require("./product");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", authMdw, requireAdminMdw, userRouter);
router.use("/product/", productRouter);
router.use("/crawl", crawlRouter);


module.exports = router;
