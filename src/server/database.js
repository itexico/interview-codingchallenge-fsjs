import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectDB = () =>
  new Promise((resolve, reject) => {
    const { NODE_ENV, MONGO_URI } = process.env;

    if (NODE_ENV !== "test") {
      mongoose
        .connect(`${MONGO_URI}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
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
