const jwt = require("jsonwebtoken");
const { customError } = require("../common/common");
const { findUserByIdDb } = require("../database/userDb");

const authMdw = (req, res, next) => {
   const bearerToken = req.headers.authorization;
   if (!bearerToken) throw customError(401, "Missing JWT token");
   // if (!bearerToken) return res.status(401).send("Missing JWT token");

   const token = req.headers.authorization.split(" ")[1];
   jwt.verify(token, "IsInR5cCI6IkpXVCJ9.eyJ1", async (err, decoded) => {
      // if (err) return res.status(401).send("Invalid token");
      if (err) throw customError(401, "Invalid token");

      const user = await findUserByIdDb(decoded.userId);
      // if (!user) return res.status(401).send("User existed");
      if (!user) throw customError(401, "User existed");

      req.user = user;
      next();
   });
};

const requireAdminMdw = (req, res, next) => {
   if (!req.user.isAdmin) return res.json(req.user);

   next();
};

module.exports = { authMdw, requireAdminMdw };
