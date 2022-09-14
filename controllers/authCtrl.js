const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { customError } = require("../errors/customError");
const User = require("../model/userModel");

const loginCtrl = async (email, password) => {
   if (!email || !password) throw customError(400, "The email address or password is required");
   const existedUser = await User.findOne({ email: email });

   if (!existedUser) throw customError(400, "The email address or password is incorrect");
   const { hashedPassword } = encryptPassword(password, existedUser.salt);

   if (hashedPassword !== existedUser.hashedPassword) throw customError(400, "The email address or password is incorrect");
   console.log(`  *** existedUser`, existedUser);
   const token = jwt.sign(
      {
         userId: existedUser._id,
      },
      process.env.MY_PRIVATE_KEY,
      {
         expiresIn: 20 ,
      }
   );
   return { token, user: { ...existedUser._doc, salt: undefined, hashedPassword: undefined } };
};

const registerCtrl = async (email, password) => {
   console.log(`  *** email, password`, email, password);
   if (!/^(?=\S*[a-z]|\d)(?=\S*[A-Z])(?=\S*[^\w\s])\S{8,}$/.test(password))
      throw customError(400, "Password containing at least 1 uppercase, 1 lowercase, 1 special character");
   if (!email || !password) throw customError(400, "The email address or password is required");
   const existedUser = await await User.findOne({ email });

   if (existedUser) throw customError(400, "Email is existed!");
   const { salt, hashedPassword } = encryptPassword(password);
   // return insertUser({
   //    email,
   //    salt,
   //    hashedPassword,
   //    dateCreate: new Date(),
   // });
   return User.insertMany([{ email, salt, hashedPassword }]);
};

const encryptPassword = (password, saltDB) => {
   const salt = saltDB || crypto.randomBytes(64).toString("hex");
   const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
   return { salt, hashedPassword };
};

module.exports = { loginCtrl, registerCtrl };
