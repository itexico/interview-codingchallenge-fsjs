const mongoose = require('mongoose');
const {Schema} = mongoose


const TaskSchema =  new Schema ({
    name:{type : String,required:true},
    category:{type:String,required:true}
});


module.exports = mongoose.model('Task',TaskSchema)