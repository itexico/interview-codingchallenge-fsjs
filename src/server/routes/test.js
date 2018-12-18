const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const url = 'mongodb://root:rootroot1@ds125862.mlab.com:25862/lists'
const dbName = 'lists'
const client = new MongoClient(url)

router.get('/', (req, res) => {

  client.connect((err, client) => {

    assert.equal(null, err);

    const db = client.db(dbName);
    const collection = db.collection('lists');

    collection.find({}).toArray(function(err, data) {

      assert.equal(err, null);
      res.send(data)
    });
  });
})


module.exports = router;