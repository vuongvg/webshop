const jwt = require("jsonwebtoken");
const { customError } = require("../errors/customError");
const { findUserByIdDb } = require("../database/userDb");

const authMdw = (req, res, next) => {
   const bearerToken = req.headers.authorization;
   if (!bearerToken) return next(customError(401,"Missing JWT token"))

   const token = req.headers.authorization.split(" ")[1];
   jwt.verify(token, process.env.MY_PRIVATE_KEY, async (err, decoded) => {
      if (err) return next(customError(401,"Invalid token"))

      const user = await findUserByIdDb(decoded.userId);
      if (!user) return next(customError(401,"User existed"))

      req.user = user;
      next();
   });
};

const requireAdminMdw = (req, res, next) => {
   if (!req.user.isAdmin) return res.json(req.user);
   
   next();
};

module.exports = { authMdw, requireAdminMdw };
