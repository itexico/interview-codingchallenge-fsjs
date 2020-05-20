import mongoose from "mongoose";

export const connectDB = (DB_USER, DB_PASSWORD) =>
  new Promise((resolve, reject) => {
    mongoose
      .connect(
        `mongodb://${DB_USER}:${DB_PASSWORD}@ds257564.mlab.com:57564/itexico-interview-cc`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then((_, error) => (error ? reject(error) : resolve()));
  });

export const disconnectDB = (done) => mongoose.disconnect(done);
