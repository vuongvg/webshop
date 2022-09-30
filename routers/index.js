const express = require("express");
const { authMdw } = require("../middlewares/authMdw");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const searchHintRouter = require("./searchHint");
const categoriesRouter = require("./categories");
const reviewRouter = require("./review");
const homeRouter = require("./home");
const tokenRouter = require("./token");
const orderRouter = require("./order");

router.use("/home", homeRouter);
router.use("/review", reviewRouter);
router.use("/categories", categoriesRouter);
router.use("/search-hint", searchHintRouter);
router.use("/auth", authRouter);
router.use("/user", authMdw, userRouter);
router.use("/product", productRouter);
router.use("/token", tokenRouter);
router.use("/order",authMdw, orderRouter);

module.exports = router;
