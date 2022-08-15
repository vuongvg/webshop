const validator = require("validator");
const { customError } = require("../common/common");

const validateUserMdw = (req, res, next) => {
   const { email, password } = req.body;
   const validateEmail = validator.isEmail(email, { allow_utf8_local_part: false });
   // if (!validateEmail) return res.status(401).send("Invalid Email");
   if (!validateEmail) throw customError(401, "Invalid Email");
   // return next(customError(401,"Invalid Email"))

   if (!validatePassword(password)) throw customError(401, "Invalid Password");
   next();
};

const validatePassword = (str) => {
   const regex = /^(?=\S*[a-z]|\d)(?=\S*[A-Z])(?=\S*[^\w\s])\S{8,}$/;
   return regex.test(str);
};

const validateEmailRegex = (email) => {
   return String(email)
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};
module.exports = { validateUserMdw };
