const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemSchema = new Schema({
    name:{
      type: String,
      required:[true, 'Necesito el nombre del la lista'],
      unique: true
    },
    categorie:{
      type: String,
      required:[true,'El nombre de la categoria es requerida']
    }
  })

// Model in singular
module.exports = mongoose.model('Stuff', itemSchema)