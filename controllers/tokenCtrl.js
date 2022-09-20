const jwt = require("jsonwebtoken");
const { customError } = require("../errors/customError");
const Token = require("../model/tokenModel");
const User = require("../model/userModel");

const refreshTokenCtrl = async (refreshToken) => {
   if (!refreshToken) throw customError(401, "Missing JWT refresh token");
   const refreshTokenDb = await Token.findOne({ token: refreshToken });

   if (!refreshTokenDb) throw customError(401, "Invalid refresh token");

   return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, decoded) => {
      if (err) {
         await Token.findOneAndDelete(refreshToken);
         throw customError(401, "Invalid refresh token");
      }
      const existedUser = await User.findById({ _id: decoded.userId });

      if (!existedUser) throw customError(401, "User existed");
      const newToken = jwt.sign(
         {
            userId: existedUser._id,
         },
         process.env.MY_PRIVATE_KEY,
         {
            expiresIn: +process.env.EXPIRES_TOKEN,
         }
      );
      const newRefreshToken = jwt.sign(
         {
            userId: existedUser._id,
         },
         process.env.REFRESH_TOKEN_KEY,
         {
            expiresIn: +process.env.EXPIRES_REFRESH_TOKEN,
         }
      );

      await Token.findOneAndUpdate({ token: refreshToken }, { token: newRefreshToken, createdAt: Date.now() });

      return { newToken, newRefreshToken };
   });
};

const removeTokenCtrl = async (refreshToken) => {
   if (!refreshToken) throw customError(401, "Missing JWT refresh token");
   const result = await Token.findOneAndDelete(refreshToken);
   return result;
};

module.exports = { refreshTokenCtrl, removeTokenCtrl };
