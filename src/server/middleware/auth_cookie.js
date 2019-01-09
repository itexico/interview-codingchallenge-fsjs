exports.validate = function(req, res, next) {
  const value = req.cookies.auth || "not set";
  console.log(`"auth" cookie: ${value}`);
  next();
};
