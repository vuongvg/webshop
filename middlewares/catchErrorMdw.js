const catchErrorMdw = (status, fn) => {
      return async (req, res, next) => {
         try {
            await fn(req, res, next);
         } catch (error) {
            next({ message: error.message, stack: error.stack, status });
         }
      };

    };
// const catchErrorMdw = (status, fn) => (req, res, next) =>
//    Promise.resolve(fn(req, res, next)).catch(next({ message: error.message, stack: error.stack, status }));

module.exports = { catchErrorMdw };
