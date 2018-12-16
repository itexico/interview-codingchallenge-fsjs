exports.ensureAuth = function (req, res, next) {
    let cookie = req.headers.cookies;

    if (cookie == null) 
        return res.status(400).send({error: 'You do not have any cookies.'});

    if (cookie != 'auth') 
        return res.status(400).send({error: 'You do not have the auth cookie.'});
    
    //User does have auth cookie
    console.log(cookie);
    next();
};