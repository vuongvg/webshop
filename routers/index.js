const express = require("express");
const { authMdw, requireAdminMdw } = require("../middlewares/authMdw");
const authRouter = require("./auth");
const userRouter = require("./user");
const crawlRouter = require("./crawl");
const productRouter = require("./product");
const dbRouter = require("./db");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", authMdw, requireAdminMdw, userRouter);
router.use("/product/", productRouter);
router.use("/crawl", crawlRouter);
router.use("/db", dbRouter);

module.exports = router;
