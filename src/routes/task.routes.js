const express = require('express');
const router = express.Router(); 


router.get('/',(req,res)=>{
    res.json({
        status:'api works'
    });
});

module.exports = router;