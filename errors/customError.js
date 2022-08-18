const customError = (status, message, stack) => {
   const error = new Error(message);
   error.status = status;
   if (stack) error.stack = stack;
   return error;
};

module.exports = { customError };
