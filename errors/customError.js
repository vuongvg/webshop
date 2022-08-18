const customError = (status, message, stack) => {
   const error = new Error(message);
   error.status = status;
   error.stack = stack;
   return error;
};

module.exports = { customError };
