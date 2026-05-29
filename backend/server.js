const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const clientRoutes = require("./clientRoutes");

app.use("/api/clients", clientRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});