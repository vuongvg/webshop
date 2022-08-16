// require("dotenv").config();
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectToDb } = require("./database");
const { editData } = require("./editData");
const router = require("./routers");
const { notFoundMdw } = require("./routers/notFoundMdw");
const { errorHandleMdw } = require("./middlewares/errorHandleMdw");

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

app.get("/", (req, res) => {
   res.send("Sever is runing: " + process.env.MONGODB_URI);
});
app.use(morgan("dev"));
app.use(express.static("public"));
app.use("/api", router);
app.use(notFoundMdw);
app.use(errorHandleMdw);

// console.log(`  *** editData()`, editData())

connectToDb(process.env.MONGODB_URI).catch((error) => {
   console.log(`  *** error connect DB`, error)
});


app.listen(port, () => {
   console.log(`Sever is runing at port ${port}`);
});
