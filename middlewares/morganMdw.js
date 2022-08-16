const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "../temp/public/error.txt"), { flags: "a" });

const morganMdw = () => {
   return morgan(
      (tokens, req, res) => {
         return [
            tokens.method(req, res),
            "-",
            tokens.date(req,res),
            "-",
            tokens.url(req, res),
            "-",
            tokens.status(req, res),
            "-",
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
            req?.error?.stack,
            '\n'
         ].join(" ");
      },
      {
         skip: function (req, res) {
            return res.statusCode < 400;
         },
         stream: accessLogStream,
      }
   );
};
// app.use(morgan("dev",{stream:accessLogStream}));

module.exports = { morganMdw };
