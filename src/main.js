//DOTENV
import dotenv from "dotenv";
dotenv.config();

//EXPRESS
import express from "express";

//ROUTES
import routes from "./routes.js";

//DATABASE
import database from "./database/config.js";

//CORS
import cors from "cors";

async function main() {
  const app = express();
  const PORT = 5000;
  await database();
  app.use(cors());
  await routes(app);
  app.listen(PORT, () =>
    console.log(`░░▒▓ Server running on port: http://localhost:${PORT} ▓▒░░`)
  );
}

main();
