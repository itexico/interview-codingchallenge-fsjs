import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectDB = () =>
  new Promise((resolve, reject) => {
    const { NODE_ENV, DB_USER, DB_PASSWORD } = process.env;

    if (NODE_ENV !== "test") {
      mongoose
        .connect(
          `mongodb://${DB_USER}:${DB_PASSWORD}@ds257564.mlab.com:57564/itexico-interview-cc`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )
        .then((_, error) => (error ? reject(error) : resolve()));
    } else {
      const mockDB = new MongoMemoryServer();

      mockDB.getUri().then((mongoURI) => {
        mongoose
          .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then((_, error) => (error ? reject(error) : resolve()));
      });
    }
  });

export const disconnectDB = () => mongoose.disconnect();
