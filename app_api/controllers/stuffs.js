var moongose = require('mongoose');
var Stuff = moongose.model('Stuff');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* Get a list of stuffs */
module.exports.stuffs = function(req, res) {
  var stuffs = [];

  Stuff.find(function(err, results) {
    if (err) {
      console.log('stuffs error: ', err);
      sendJSONresponse(res, 404, err);
    } else {
      results.forEach(function(stuff) {
        stuffs.push({
          name: stuff.name,
          _id: stuff._id
        });
      });

      sendJSONresponse(res,200,stuffs);
    }
  });
};

/* Get a stuff by id */
module.exports.stuffsReadOne = function(req, res) {
  console.log('finding stuffs details ', req.params);

  if (req.params && req.params.stuffid) {
    Stuff
      .findById(req.params.stuffid)
      .exec(function(err, stuff) {
        if (!stuff) {
          sendJSONresponse(res, 404, { "message" : "stuffid not foun"});
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }

        console.log(stuff);
        sendJSONresponse(res, 200, stuff);
      });
  } else {
    console.log('No stuffid specified');
    sendJSONresponse(res, 404, { "message" : "No stuffid in request"});
  }
};

/* POST a new stuff */
module.exports.stuffsCreate = function(req, res) {
  console.log(req.body);

  Stuff.create({
    name: req.body.name
  }, function(err, stuff) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(stuff);
      sendJSONresponse(res, 201, stuff);
    }
  });
};

/* PUT update existing stuff  by id*/
module.exports.stuffsUpdateOne = function(req, res) {
  if (!req.params.stuffid) {
    sendJSONresponse(res, 404, {"message" : "Not foud, stuffid is required"});
    return;
  }

  Stuff
    .findById(req.params.stuffid)
    .exec(
      function(err, stuff) {
        if (!stuff) {
          sendJSONresponse(res, 404, {"message" : "stuffid not found"});
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        stuff.name = req.body.name;

        stuff.save(function(err, stuff) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, stuff);
          }
        });
      }
    );
};

/* DELETE a stuff by its id */
module.exports.stuffsDeleteOne = function(req, res) {
  var stuffid = req.params.stuffid;

  if (stuffid) {
    Stuff
      .findByIdAndRemove(stuffid)
      .exec(
        function(err, stuff) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }

          console.log("Stuff id " + stuffid + " deleted");
          sendJSONresponse(res, 204, null)
        }
      );
  } else {
    sendJSONresponse(res, 404, {"message" : "No stuffid"});
  }
};
