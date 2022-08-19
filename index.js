// require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectToDb, db } = require("./database");
const { editData } = require("./editData");
const router = require("./routers");
const { notFoundMdw } = require("./middlewares/notFoundMdw");
const { errorHandleMdw } = require("./middlewares/errorHandleMdw");
const { checkConnectDbMdw } = require("./middlewares/checkConnectDbMdw");

const port = process.env.PORT || 5001;
console.log("process.env.PORT:", process.env.PORT, process.env.MONGODB_URI);
const timeDeloy = new Date().toLocaleTimeString("vi-VN", { timeZone: "Asia/Saigon" });

const app = express();

app.use(express.json());
app.use(
   cors({
      origin: "*",
      // origin:"http://mywebsite.vn"
   })
);

app.get("/", (req, res) => {
   res.send("Sever is runing: " + timeDeloy + db.products);

   // + /\@.+/.exec(process.env.MONGODB_URI)
});
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/api", checkConnectDbMdw, router);
app.use(notFoundMdw);
app.use(errorHandleMdw);

// console.log(`  *** editData()`, editData())

connectToDb(process.env.MONGODB_URI).catch((error) => {
   console.log(`  *** ERROR connect to DB`, error);
});

app.listen(port, () => {
   console.log(`Sever is runing at port ${port}`);
});

setInterval(() => {
   console.log("DB: ", Object.keys(db));
}, 20 * 1000);
