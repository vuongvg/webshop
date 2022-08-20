// require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectToDb, db } = require("./database/connect");
const { editData } = require("./editData");
const router = require("./routers");
const { notFoundMdw } = require("./middlewares/notFoundMdw");
const { errorHandleMdw } = require("./middlewares/errorHandleMdw");
const { checkConnectDbMdw } = require("./middlewares/checkConnectDbMdw");
const { default: mongoose } = require("mongoose");
const { Product } = require("./model/productModel");

const port = process.env.PORT || 5001;
const timeDeloy = new Date().toLocaleTimeString("vi-VN", { timeZone: "Asia/Saigon" });

const app = express();

app.use(express.json());
app.use(
   cors({
      origin: "*",
      // origin:"http://mywebsite.vn"
   })
);

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
   console.log("process.env.PORT:", process.env.PORT, process.env.MONGODB_URI);
   const result = "Sever is runing: " + `${timeDeloy} - ${Product.db.collections.users.name}`;
   console.log(result);
   res.status(200).send(result);
   // + /\@.+/.exec(process.env.MONGODB_URI)
});

// app.use("/api", checkConnectDbMdw, router);
app.use("/api", checkConnectDbMdw, router);
app.use(notFoundMdw);
app.use(errorHandleMdw);

// console.log(`  *** editData()`, editData())
// (async () => {
//    try {
//       await connectToDb(process.env.MONGODB_URI);
//    } catch (error) {
//       console.log(`  *** ERROR connect to DB`, error);
//    }
// })();
connectToDb();
// mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('Connect DB')).catch(err=>console.log(err))

app.listen(port, () => {
   console.log(`Sever is runing at port ${port}`);
});
