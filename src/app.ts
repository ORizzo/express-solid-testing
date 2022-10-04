import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { router as routes } from "./routes/routes";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(
  process.env.PORT,
  () => `Server running on port ${process.env.PORT}`
);

export default app;
