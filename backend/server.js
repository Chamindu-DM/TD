import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});