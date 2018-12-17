module.exports = (req, res, next) => {
  if('auth' in req.cookies){
    next(); 
  } else {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
}