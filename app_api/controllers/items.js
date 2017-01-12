var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


/* Get a list of stuffs */
module.exports.stuffsItemsReadOne = function(req, res) {
  sendJSONresponse(res, 200, 'pepperoni');

}
