const errorHandleMdw = (err, req, res, next) => {
   if (err) {
      const{url,body,headers}=req
      // console.log(`ERROR: `, {url,body,headers,stack:err.stack})
      res.status(err.status||400).send(err.message);
   } else {
      next();
   }
};

module.exports = { errorHandleMdw };
