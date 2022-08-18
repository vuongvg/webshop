const express = require("express");
const { connectToDb } = require("../database");
const { catchErrorMdw } = require("../middlewares/catchErrorMdw");
const router = express.Router();

router.get("/",catchErrorMdw(403, async (req, res) => {
       console.log(`  *** process.env.MONGODB_URI`, process.env.MONGODB_URI)
      try {
         await connectToDb(process.env.MONGODB_URI);
         res.send("DB reconnect");
      } catch (error) {
         console.log(`db not connect`, error);
         res.send("DB not reconnect");
      }
   })
);
module.exports = router;
