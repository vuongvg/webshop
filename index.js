require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectToDb } = require("./database/connect");
const { editData } = require("./editData");
const data = require("./products_end.json");
const router = require("./routers");
const { notFoundMdw } = require("./middlewares/notFoundMdw");
const { errorHandleMdw } = require("./middlewares/errorHandleMdw");

const { checkConnectDbMdw } = require("./middlewares/checkConnectDbMdw");
const { Product } = require("./model/productModel");

//////////////////////////
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
///////////////


///////////////

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
   console.log("process.env.PORT:", process.env.PORT, process.env.MONGODB_URI);
   const result = "Sever is runing: " + `${timeDeloy}`;
   console.log(result);
   res.status(200).send(result);
   // + /\@.+/.exec(process.env.MONGODB_URI)
});

// console.log(`  *** editData`, editData().map((item) => ({...item,back_image:{...item.back_image,src:!item.back_image.src.match(/\.jpg/)?'':item.back_image.src}})));
// console.log(data.filter(i=>!i.back_image.src.match(/\.jpg/)).length);

app.use("/api", router);
app.use("/api", checkConnectDbMdw, router);
app.use(notFoundMdw);
app.use(errorHandleMdw);

connectToDb(); 
 
app.listen(port, () => {
   console.log(`Sever is runing at port ${port}`);
});
