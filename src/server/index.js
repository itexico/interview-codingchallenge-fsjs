import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

import app from "./app";
import { connectDB } from "./database";

connectDB()
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Itexico API on http://localhost:${process.env.PORT}`)
    )
  )
  .catch((error) => console.log("Error connecting to the database."));
