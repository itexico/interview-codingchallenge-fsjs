var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

  app.post('/list', (req, res) => {
    const note = { title: req.body.title, text: req.body.body };
    db.collection('list').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'Please check the id' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/list/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { title: req.body.title, text: req.body.body };
    db.collection('list').update(details, note, (err, result) => {
      if (err) {
        res.send({ 'error': 'Please check the id' });
      } else {
        res.send(note);
      }
    });
  });

  app.get('/list/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('list').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'Please check the id' });
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/list/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('list').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'Please check the id' });
      } else {
        res.send('Id: ' + id + ' deleted!');
      }
    });
  });

};