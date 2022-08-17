const errorHandleMdw = (err, req, res, next) => {
   if (err) {
      console.log(`  *** ERROR handle mdw`, err);
      req.error = err;
      res.status(err.status || 400).send(err.message);
   } else {
      next();
   }
};

module.exports = { errorHandleMdw };
