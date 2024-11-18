import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConnection from "./helpers/dbconnect.js";

import { authRoutes, userRoutes, adminRoutes } from "./src/routes/index.js";
import authenticate from "./middleware/authenticate.js";

try {
  await dbConnection;
  const app = express();
  const port = process.env.PORT ?? 8082;

  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", authRoutes);
  app.use(authenticate);
  app.use("/api/user", userRoutes);
  app.use("/api/admin", adminRoutes);

  // Fallback route for 404 (Not Found)
  app.use((req, res, next) => {
    res.status(404).send("Sorry, we couldn't find that!");
  });

  // Error handling middleware (optional)
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
} catch (err) {
  console.log(err);
}
