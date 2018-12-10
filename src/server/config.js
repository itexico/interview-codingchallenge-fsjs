// Variables and Remote Enviroment

process.env.NODE_ENV = process.env.NODE_ENV || 'env'
process.env.PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'dev') {
  process.env.urlDB = 'mongodb://127.0.0.1:27017/lists' 
}