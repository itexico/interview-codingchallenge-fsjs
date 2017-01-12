var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* Get a list of stuffs */
module.exports.stuffs = function(req, res) {
  var stuffs = ['pizzas'];
  sendJSONresponse(res, 200, stuffs);

}
