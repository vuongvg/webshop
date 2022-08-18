const catchErrorMdw = (status, fn) => {
      return async (req, res, next) => {
         try {
            await fn(req, res, next);
         } catch (error) {
            console.log(`  *** error22222222`, error)
            next({ message: error.message, stack: error.stack, status:error.status||status });
            // next({ message: error.message, stack: error.stack, status:error.status});
         }
      };

    };
// const catchErrorMdw = (status, fn) => (req, res, next) =>
//    Promise.resolve(fn(req, res, next)).catch(next({ message: error.message, stack: error.stack, status }));

module.exports = { catchErrorMdw };
