import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import agentRoutes from "./routes/agentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./db/connect.js";
import cookieParser from "cookie-parser";

config();
const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
app.use(
  cors({
    origin: "https://multi-agent-bot.vercel.app",
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());
await connectDB();

app.use("/agent", agentRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
