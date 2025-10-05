require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const housesRouter = require("./src/api/routes/houses");
const agentsRouter = require("./src/api/routes/agents");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use(express.json());

connectDB();

app.use("/api/v1/houses", housesRouter);
app.use("/api/v1/agents", agentsRouter);

app.use((req, res, next) => {
    return res.status(404).json({
    message: "Ruta no encontrada",
    error: "La ruta a la que intentas acceder no existe"
  });
})

app.listen(3000, () => {
  console.log("Servidor levantado en http://localhost:3000");
})