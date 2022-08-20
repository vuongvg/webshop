const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const loginCtrl = async (email, password) => {
   const existedUser = await User.findOne({ email: email })
   console.log(`  *** existedUser`, existedUser.salt)
   console.log(`  *** existedUser`, Object.keys(existedUser))
   // const existedUser = await findUserByEmailDb(email);
   if (!existedUser) throw new Error("The email address or password is incorrect");
   // if (!existedUser) throw customError(503,"Email is not existed");
   const { hashedPassword } = encryptPassword(password, existedUser.salt);

   if (hashedPassword !== existedUser.hashedPassword) throw new Error("The email address or password is incorrect");

   return jwt.sign(
      {
         userId: existedUser._id,
      },
      process.env.MY_PRIVATE_KEY,
      {
         expiresIn: 45 * 60,
      }
   );
};

const registerCtrl = async (email, password) => {
   // const existedUser = await findUserByEmailDb(email);
   const existedUser = await await User.findOne({ email })
   if (existedUser) throw new Error("Email is existed!");

   const { salt, hashedPassword } = encryptPassword(password);
   // return insertUser({
   //    email,
   //    salt,
   //    hashedPassword,
   //    dateCreate: new Date(),
   // });
   return User.insertMany([{ email,password, salt, hashedPassword }]);
};

const encryptPassword = (password, saltDB) => {
   const salt = saltDB || crypto.randomBytes(64).toString("hex");
   const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
   return { salt, hashedPassword };
};

module.exports = { loginCtrl, registerCtrl };
