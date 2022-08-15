const { customError } = require("../common/common");

const notFoundMdw = (req, res, next) => {
   throw customError(404, "Router does not exist");
};

module.exports = { notFoundMdw };
