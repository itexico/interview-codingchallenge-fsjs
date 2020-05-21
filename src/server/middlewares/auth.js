export const authenticated = (req, res, next) => {
  const { auth } = req.cookies;
  console.log(auth);
  next();
};
