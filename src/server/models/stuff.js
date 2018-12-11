const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemsSchema = new Schema({
    /**
     * name
     * categorie
     * image
     */
  })

// Model in singular
module.exports = mongoose.model('Stuff', itemSchema)