import { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

export default function App() {
  const [idEdit, setIdEdit] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [colorType, setColorType] = useState("");
  const [coloration, setColoration] = useState("");
  const [toner, setToner] = useState("");
  const [grams, setGrams] = useState("");
  const [oxVolume, setOxVolume] = useState("");

  const [serviceDate, setServiceDate] = useState("");

  const [photo, setPhoto] = useState(null);

  const [search, setSearch] = useState("");

  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClients();
  }, []);

  async function addClient(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("colorType", colorType);
    formData.append("coloration", coloration);
    formData.append("toner", toner);
    formData.append("grams", grams);
    formData.append("oxVolume", oxVolume);
    formData.append("notes", notes);
    formData.append("serviceDate", serviceDate);

    if (photo) {
      formData.append("photo", photo);
    }

    if (idEdit) {
      await axios.put(
        `http://localhost:3001/api/clients/${idEdit}`,
        formData
      );

      setIdEdit(null);
    } else {
      await axios.post(
        "http://localhost:3001/api/clients",
        formData
      );
    }

    clearForm();
    loadClients();
  }

  function clearForm() {
    setName("");
    setPhone("");
    setColorType("");
    setColoration("");
    setToner("");
    setGrams("");
    setOxVolume("");
    setNotes("");
    setServiceDate("");
    setPhoto(null);
  }

  async function loadClients() {
    const res = await axios.get(
      "http://localhost:3001/api/clients"
    );

    setClients(res.data);
  }

  async function deleteClient(id) {
    await axios.delete(
      `http://localhost:3001/api/clients/${id}`
    );

    loadClients();
  }

  function editClient(c) {
    setIdEdit(c.id);

    setName(c.name);
    setPhone(c.phone);
    setColorType(c.color_type);
    setColoration(c.coloration);
    setToner(c.toner);
    setGrams(c.grams);
    setOxVolume(c.ox_volume);
    setNotes(c.notes);
    setServiceDate(c.service_date);
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Sistema de Cabelo 💇‍♀️
      </Typography>

      <Card sx={{ borderRadius: 4, mb: 4 }}>
        <CardContent>
          <Box
            component="form"
            onSubmit={addClient}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />

            <TextField
              label="Tipo da cor"
              value={colorType}
              onChange={(e) => setColorType(e.target.value)}
              fullWidth
            />

            <TextField
              label="Coloração"
              value={coloration}
              onChange={(e) => setColoration(e.target.value)}
              fullWidth
            />

            <TextField
              label="Tonalizante"
              value={toner}
              onChange={(e) => setToner(e.target.value)}
              fullWidth
            />

            <TextField
              label="Gramas"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              fullWidth
            />

            <TextField
              label="Volume OX"
              value={oxVolume}
              onChange={(e) => setOxVolume(e.target.value)}
              fullWidth
            />

            <TextField
              label="Data do atendimento"
              type="date"
              value={serviceDate}
              onChange={(e) =>
                setServiceDate(e.target.value)
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Observações"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />

            <input
              type="file"
              onChange={(e) =>
                setPhoto(e.target.files[0])
              }
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
            >
              {idEdit
                ? "Atualizar Cliente"
                : "Salvar Cliente"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TextField
        label="Buscar cliente"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {clients
        .filter((c) =>
          c.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((c) => (
          <Card
            key={c.id}
            sx={{
              mb: 2,
              borderRadius: 4
            }}
          >
            <CardContent>
              {c.photo && (
                <img
                  src={`http://localhost:3001/uploads/${c.photo}`}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 15
                  }}
                />
              )}

              <Typography
                variant="h5"
                fontWeight="bold"
              >
                {c.name}
              </Typography>

              <Typography>
                <b>Telefone:</b> {c.phone}
              </Typography>

              <Typography>
                <b>Tipo da cor:</b> {c.color_type}
              </Typography>

              <Typography>
                <b>Coloração:</b> {c.coloration}
              </Typography>

              <Typography>
                <b>Tonalizante:</b> {c.toner}
              </Typography>

              <Typography>
                <b>Gramas:</b> {c.grams}
              </Typography>

              <Typography>
                <b>OX:</b> {c.ox_volume}
              </Typography>

              <Typography>
  <b>Data:</b>{" "}
  {new Date(c.service_date).toLocaleDateString("pt-BR")}
</Typography>

              <Typography>
                <b>Observações:</b> {c.notes}
              </Typography>

              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => editClient(c)}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteClient(c.id)}
                >
                  Excluir
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
}