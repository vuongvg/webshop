const { customError } = require("./customError");

const catchErrorDB =  async(fn) => {
        try {
            return await fn;
        } catch (error) {
            throw customError(503, "Error not connect to DB",error.stack);
        }
};

module.exports = { catchErrorDB };
