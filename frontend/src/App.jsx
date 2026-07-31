import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import banner from "./assets/banner.png";
import background from "./assets/background.jpg";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid
} from "@mui/material";

const API_URL = "https://seu-backend.onrender.com";
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
      `${API_URL}/api/clients/${idEdit}`,
      formData
    );

    setIdEdit(null);
  } else {
    await axios.post(
      `${API_URL}/api/clients`,
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
    `${API_URL}/api/clients`
  );

  setClients(res.data);
}

  async function deleteClient(id) {
  await axios.delete(
    `${API_URL}/api/clients/${id}`
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
    <Box
  sx={{
    minHeight: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    py: 4
  }}
>
<Container maxWidth="md">
      <Header />
<Card
  sx={{
    borderRadius: 6,
    mb: 4,
    p: 2,
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    background: "rgba(255,255,255,.90)",
    backdropFilter: "blur(10px)"
  }}
>
        <CardContent>
          <Typography
  variant="h5"
  sx={{
    mb: 3,
    textAlign: "center",
    color: "#d63384",
    fontWeight: "bold"
  }}
>
  Cadastro da Cliente
</Typography>
          <Box component="form" onSubmit={addClient}>
  <Grid container spacing={2}/> 

  
   <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Nome"
    value={name}
    onChange={(e) => setName(e.target.value)}
    fullWidth
  />
</Grid>

      <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Telefone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    fullWidth
  />
</Grid>

            <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Tipo da cor"
    value={colorType}
    onChange={(e) => setColorType(e.target.value)}
    fullWidth
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Coloração"
    value={coloration}
    onChange={(e) => setColoration(e.target.value)}
    fullWidth
  />
</Grid>

            <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Tonalizante"
    value={toner}
    onChange={(e) => setToner(e.target.value)}
    fullWidth
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Gramas"
    value={grams}
    onChange={(e) => setGrams(e.target.value)}
    fullWidth
  />
</Grid>

           <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Volume OX"
    value={oxVolume}
    onChange={(e) => setOxVolume(e.target.value)}
    fullWidth
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Data do atendimento"
    type="date"
    value={serviceDate}
    onChange={(e) => setServiceDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
    fullWidth
  />
</Grid>

            <Grid size={12}>
  <TextField
    label="Observações"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    multiline
    rows={4}
    fullWidth
  />
</Grid>

            <Grid size={12}>
  <input
    type="file"
    onChange={(e) => setPhoto(e.target.files[0])}
  />
</Grid>

           <Grid size={12}>
  <Button
    variant="contained"
    type="submit"
    fullWidth
    sx={{
      mt: 2,
      py: 1.7,
      borderRadius: 4,
      fontSize: 18,
      fontWeight: "bold",
      background:
        "linear-gradient(90deg,#d63384,#f783ac)"
    }}
  >
    {idEdit ? "Atualizar Cliente" : "Salvar Cliente"}
  </Button>
</Grid>
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
                  src={`${API_URL}/uploads/${c.photo}`}
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
        
       <Box
    sx={{
        mt:6,
        mb:2,
        textAlign:"center",
        color:"#777"
    }}
>
  
    © Girl Power • Sistema para Salão de Beleza

</Box> 
    </Container>
    
</Box>
  );
}