import express from "express";
import cors from "cors";
import { initializeUsers } from "./models/users.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

//inicia el seeder de usuarios
await initializeUsers();

app.get("/", (req, res) => {
  res.json({ message: "API StepOver funcionando" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});