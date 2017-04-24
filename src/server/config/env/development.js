'use strict';

module.exports = {
  port: process.env.PORT || 3005,
  mongo: {
    port: process.env.MONGO_PORT || 27017,
    url: process.env.MONGO_URL || 'localhost',
    db: process.env.MONGO_DATABASE || 'challenge',
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || ''
  }
}
