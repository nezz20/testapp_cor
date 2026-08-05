const express = require("express");
const router = express.Router();
const multer = require("multer");

const db = require("./config/db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Criar cliente
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      phone,
      colorType,
      coloration,
      toner,
      grams,
      oxVolume,
      notes,
      serviceDate
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO clients
      (
        name,
        phone,
        color_type,
        coloration,
        toner,
        grams,
        ox_volume,
        notes,
        service_date,
        photo
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const result = await db.query(sql, [
      name,
      phone,
      colorType,
      coloration,
      toner,
      grams,
      oxVolume,
      notes,
      serviceDate,
      photo
    ]);

    res.json({
      message: "Cliente salvo com sucesso",
      client: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Listar clientes
router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM clients ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Excluir cliente
router.delete("/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM clients WHERE id = $1",
      [req.params.id]
    );

    res.json({
      message: "Cliente removido"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Atualizar cliente
router.put("/:id", upload.single("photo"), async (req, res) => {

  try {

    const {
      name,
      phone,
      colorType,
      coloration,
      toner,
      grams,
      oxVolume,
      notes,
      serviceDate
    } = req.body;

    const id = req.params.id;

    let sql = `
      UPDATE clients SET
      name=$1,
      phone=$2,
      color_type=$3,
      coloration=$4,
      toner=$5,
      grams=$6,
      ox_volume=$7,
      notes=$8,
      service_date=$9
    `;

    const values = [
      name,
      phone,
      colorType,
      coloration,
      toner,
      grams,
      oxVolume,
      notes,
      serviceDate
    ];

    if (req.file) {
      sql += ", photo=$10 WHERE id=$11";
      values.push(req.file.filename);
      values.push(id);
    } else {
      sql += " WHERE id=$10";
      values.push(id);
    }

    await db.query(sql, values);

    res.json({
      message: "Cliente atualizado"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
