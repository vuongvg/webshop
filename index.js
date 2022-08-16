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
const winston = require("winston");
const path = require("path");
const { morganMdw } = require("./middlewares/morganMdw");

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
app.use(morganMdw());
app.use(morgan("dev"));
app.use("/error", express.static("temp"));
app.use("/api", router);
app.use(notFoundMdw);
app.use(errorHandleMdw);

// console.log(`  *** editData()`, editData())

// const logger = winston.createLogger({
//    level: "error",
//    format: winston.format.simple(),
//    transports: [new winston.transports.File({ filename: "./public/errorDB.log", level: "error" })],
// });

// logger.error({name:'Hello again distributed logs'});

(async () => {
   try {
      await connectToDb(process.env.MONGODB_URI); 
   } catch (error) { 
      console.log(`  *** error`, error);
      const fileName = new Date().toLocaleDateString().replace(/\//g, "");
      await fs.promises.appendFile(
         `./temp/errorDB-${fileName}.txt`, 
         `${new Date()} -- code:  ${error.code} \n ${error.stack} \n\n`,  
         { flag: "a+" }
      );
   }
})();

// connectToDb(process.env.MONGODB_URI).catch((e) => {
//    // logger.error(`${new Date()} -- code:  ${e.code} \n ${e.stack} \n
//    // ***********************************************************************`);
//    console.log(`  *** e`, e)
// });

// try {
//    const a=0
//    a=1
// } catch (error) {
//    fs.writeFileSync('hello.txt','aaaaaaaa')
//    console.log(`  *** error`, error)
// }
app.listen(port, () => {
   console.log(`Sever is runing at port ${port}`);
});
