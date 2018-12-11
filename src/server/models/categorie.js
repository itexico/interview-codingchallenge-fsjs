const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  CategorieSchema = new Schema({
    /**
     * id
     * Name
     */
  })

module.exports = mongoose.model('Categorie', CategorieSchema)