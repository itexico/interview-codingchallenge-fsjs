const  express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index.html');
})

router.post('/', function (req, res) {
  res.send('POST request to the homepage');
})


module.exports = router