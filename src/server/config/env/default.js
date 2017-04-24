'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  mongo: {
    port: process.env.MONGO_PORT || 27017,
    url: process.env.MONGO_URL || 'localhost',
    db: process.env.MONGO_DATABASE || 'challenge-test',
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || ''
  },
  cookieParser: {
    secret: process.env.COOKIE_PARSER_SECRET ||  'N3tz}ZQ7Atr\R=n&7,'
  }
}
