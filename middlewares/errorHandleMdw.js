const errorHandleMdw = (err, req, res, next) => {
   if (err) {
      err.stack = err.stack
      .split("\n")
      .filter((line) => !line.match(/\\node_modules\\/))
      .join("\n");
      console.log(err.status, err.message + "\n", err.stack);
      req.error = err;
      res.status(err.status).send(err.message);
   } else {
      next();
   }
};

module.exports = { errorHandleMdw };
