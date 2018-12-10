const express= require('express');
const router= express.Router();

const Task = require('../../../server/database/task');

router.get('/', (req, res) => {
    Task.find(function(err, tasks){
        console.log(tasks);

    });
    res.json({
        status: 'WORKS'
    });
        
    
});

module.exports = router;