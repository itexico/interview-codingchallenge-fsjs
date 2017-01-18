var moongose = require('mongoose');
var Stuff = moongose.model('Stuff');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* POST creates a new item for a specific stuffid  */
/* /api/stuffs/struffid/item, */
module.exports.stuffsItemsCreate = function (req, res) {
  console.log("adding item to stuff");
  if (req.params.stuffid) {
    Stuff
      .findById(req.params.stuffid)
      .select('items')
      .exec(
        function(err, stuff) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            stuff.items.push({
              name: req.params.item
            });

            stuff.save(function(err, stuff) {
              var thisItem;
              if (err) {
                sendJSONresponse(res, 404, err)
              } else {
                thisItem = stuff.items[stuff.items.length - 1];
                sendJSONresponse(res, 201, thisItem);
              }
            })
          }
        }
      );
  } else {
    sendJSONresponse(res, 404, { "message" : "Not found, stuffid is required" })
  }

};

/* Get a list of items by  */
/* /api/stuffs/stuffid */
module.exports.stuffsItemsByStuffId = function(req, res) {
  sendJSONresponse(res, 200, 'pepperoni');

}
