require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectToDb } = require("./database");
const { editData } = require("./editData");
const router = require("./routers");
const { notFoundMdw } = require("./routers/notFoundMdw");
const { errorHandleMdw } = require("./middlewares/errorHandleMdw");
const url = require("url");

const port = process.env.PORT || 5001;
console.log("process.env.PORT:", process.env.PORT, process.env.MONGODB_URI);

const app = express();

app.use(express.json());
app.use(
   cors({
      origin: "*",
      // origin:"http://mywebsite.vn"
   })
);
const mdw = (req, res, next) => {
   if (!req.query.name) throw new Error('aaaaaaaaaaaaaaaa')
   next();
};
app.use(morgan("dev"));
app.get("/", (req, res) => {
   res.send("Sever is runing: " + process.env.MONGODB_URI);
});
app.get("/test", mdw, (req, res) => res.send("TEST"));
app.use("/api", router);
app.use(notFoundMdw);
app.use(errorHandleMdw);

// console.log(url.parse(process.env.MONGODB_URI));
// console.log(url.parse('https://webshop-sigma.vercel.app/api/product?slug=&per_page=20&page=&orderby=&order=&pa_color=&range_price=&pa_brand=&pa_discount=&pa_rating=&key=shi'));

// console.log(`  *** editData()`, editData())

connectToDb(process.env.MONGODB_URI);

app.listen(port, () => {
   console.log(`Sever is runing at port ${port}`);
});
