import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configuration/database.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
