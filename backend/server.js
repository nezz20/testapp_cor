require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const clientRoutes = require("./clientRoutes");

app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});