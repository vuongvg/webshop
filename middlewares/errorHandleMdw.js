const { CustomError } = require("../errors/customError");

const errorHandleMdw = (err, req, res, next) => {
   console.log(`  *** err`, err)
   if (err instanceof CustomError) {
      const stack = err.stack
         .split("\n")
         .filter((line) => !line.match(/node_modules/))
         .join("\n");
      console.log('***',err.status, err.message + "\n", stack);
      req.error = err;
      res.status(err.status).send(err.message);
   } else {
      return res.status(500).json({ msg: "Something went wrong, please try again" })
   }
};

module.exports = { errorHandleMdw };
