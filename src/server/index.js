import app from "./app";
import { connectDB } from "./database";

const PORT = 3000;
const DB_USER = "developer";
const DB_PASSWORD = "developer2020";

connectDB(DB_USER, DB_PASSWORD)
  .then(() => app.listen(PORT, () => `Itexico API on http://localhost:${PORT}`))
  .catch((error) => console.log("Error connecting to the database."));
