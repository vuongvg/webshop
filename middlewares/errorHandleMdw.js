const fs = require("fs");
const errorHandleMdw = (err, req, res, next) => {
   if (err) {
      console.log(`  *** err handle mdw`, err)
      req.error = err;
      Promise.resolve(writeError(err, req)).catch((e) => console.log("error write file", e));
      res.status(err.status || 400).send(err.message);
   } else {
      next();
   }
};

const writeError = async (err, req) => {
   const {
      url,
      body,
      headers: { authorization, host },
   } = req;
   const { status, stack } = err;
   const message = {
      message: err.message,
      time: new Date().toLocaleString() + ` -- ${host + url} -- ${status}`,
      body,
      authorization,
      stack: stack.replace(/\\/g, "/").split("\n"),
   };
   const data = await fs.promises.readFile("./public/error.json", { encoding: "utf8" });
   const dataJson = JSON.parse(data);
   dataJson.unshift(message);
   await fs.promises.writeFile("./public/error.json", JSON.stringify(dataJson));
};
const writeErrorDB = async (err) => {
   const { status, stack } = err;
   const message = {
      message: err.message,
      time: new Date().toLocaleString() + ` -- ${status}`,
      stack: stack.replace(/\\/g, "/").split("\n"),
   };
   const data = await fs.promises.readFile("./public/error.json", { encoding: "utf8" });
   const dataJson = JSON.parse(data);
   dataJson.unshift(message);
   await fs.promises.writeFile("./public/error.json", JSON.stringify(dataJson));
};

module.exports = { errorHandleMdw, writeErrorDB };
