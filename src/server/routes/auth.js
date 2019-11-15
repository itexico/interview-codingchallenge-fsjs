const express = require( 'express' );
const router = express.Router();

router.get( '/isAutheticated', async ( req, res ) => {
  const cookie = req.cookies._auth;
  return res.status( 200 ).json({ isAutheticated: cookie ? true : false });
});

module.exports = router;