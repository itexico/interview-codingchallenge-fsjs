var mongoose = require("mongoose");
var Painting = mongoose.model("Painting", paintingSchema);

// method GET -- returns all the paintings
exports.findAll = function(req, res) {
 Painting.find(function(err, paintings) {
 if(err) res.send(500, err.message);
 console.log('GET /paintings')
 res.status(200).jsonp(paintings);
 });
};

// method GET -- returns a painting by ID
exports.findById = function(req, res) {
 Painting.findById(req.params.id, function(err, client) {
 if(err) return res.send(500, err.message);
 console.log('GET /painting/' + req.params.id);
 res.status(200).jsonp(painting);
 });
};

//method POST -- adds a new painting in DB
exports.add = function(req, res) {
 console.log('POST');
 console.log(req.body);
 var painting = new Painting({
   title: req.body.title
   author: req.body.author,
   technique: req.body.technique,
   year: req.body.year
 });

 painting.save(function(err, client) {
 if(err) return res.send(500, err.message);
 res.status(200).jsonp(painting);
 });
};

//method PUT -- updates a register that was registered before
exports.update = function(req, res) {
 Painting.findById(req.params.id, function(err, painting) {
 painting.title = req.body.title;
 painting.author = req.body.author;
 painting.technique = req.body.technique;
 painting.year = req.body.year;
 painting.save(function(err) {
 if(err) return res.send(500, err.message);
 res.status(200).jsonp(painting);
 });
 });
};

//method DELETE -- deletes
exports.delete = function(req, res) {
 Painting.findById(req.params.id, function(err, painting) {
 painting.remove(function(err) {
 if(err) return res.send(500, err.message);
 res.json({ message: 'Successfully deleted' });
 });
 });
};
