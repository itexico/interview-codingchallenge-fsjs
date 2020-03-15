import mongoose from 'mongoose';
import options from '../config';

export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose
    .connect(
      url,
      {
        ...opts,
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    )
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(`DB Connection Error: ${err.message}`));
};
