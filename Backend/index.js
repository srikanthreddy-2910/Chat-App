import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./models/db.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("http://localhost:", PORT);
  connectdb();
});   