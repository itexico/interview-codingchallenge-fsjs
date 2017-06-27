var mongoose = require('mongoose');

var FavStuffSchema = mongoose.Schema({
    fav_stuff: { type : String , unique : true, required : true, dropDups: true },
    fav_stuff_list: { type : Array , unique : false, required : true }
});

var User = module.exports = mongoose.model('User', userSchema);
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}