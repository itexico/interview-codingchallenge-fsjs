export default (req, res, next) => {
  console.log('Cookies: ', req.cookies);
  if (req.cookies && req.cookies.auth) {
    console.log(`Auth cookie is present with the value: ${req.cookies.auth}`);
  }
  next();
};
