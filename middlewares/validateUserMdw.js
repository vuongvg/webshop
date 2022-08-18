const validator = require("validator");
const { customError } = require("../errors/customError");

const validateUserMdw = (req, res, next) => {
   const { email, password } = req.body;
   const validateEmail = validator.isEmail(email, { allow_utf8_local_part: false });

   if (!validateEmail) return next(customError(401, "Invalid Email"));
   // if (!validateEmail) throw new Error( "Invalid Email");

   if (!validatePassword(password)) return next(customError(401, "Invalid Password"));

   next();
};

const validatePassword = (str) => {
   const regex = /^(?=\S*[a-z]|\d)(?=\S*[A-Z])(?=\S*[^\w\s])\S{8,}$/;
   return regex.test(str);
};

module.exports = { validateUserMdw };
