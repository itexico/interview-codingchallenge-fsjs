const cookiesMiddleware = ( req, res, next ) => {
  // check if client sent cookie
  const cookie = req.cookies._auth;
  if ( cookie === undefined ) {
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring( 2,randomNumber.length );
    res.cookie( '_auth', randomNumber, { maxAge: 900000, httpOnly: true });
    if ( process.env.NODE_ENV !== 'test' )
      console.log( 'Cookie `_auth` created successfully' );
  }
  else console.log( 'Cookie exists', cookie );
  return next();
};

module.exports = cookiesMiddleware;