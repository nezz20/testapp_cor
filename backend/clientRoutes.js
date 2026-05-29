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

router.post("/", upload.single("photo"), (req, res) => {
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
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
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Cliente salvo com sucesso"
      });
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM clients", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM clients WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Cliente removido"
      });
    }
  );
});

router.put("/:id", upload.single("photo"), (req, res) => {
  const { id } = req.params;

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

  let sql = `
    UPDATE clients SET
    name = ?,
    phone = ?,
    color_type = ?,
    coloration = ?,
    toner = ?,
    grams = ?,
    ox_volume = ?,
    notes = ?,
    service_date = ?
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
    sql += `, photo = ?`;
    values.push(req.file.filename);
  }

  sql += ` WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Cliente atualizado"
    });
  });
});

module.exports = router;