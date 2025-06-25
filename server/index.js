import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import agentRoutes from './routes/agentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './db/connect.js';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
await connectDB();

app.use("/agent", agentRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
