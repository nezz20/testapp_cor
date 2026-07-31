import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import banner from "../assets/banner.png";

export default function Header() {
  return (
    <Box
      sx={{
        borderRadius: 6,
        overflow: "hidden",
        mb: 4,
        boxShadow: 5
      }}
    >
      <Box
        sx={{
          height: 280,
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(0,0,0,.35)",
          backgroundBlendMode: "darken"
        }}
      >
        <FavoriteIcon sx={{ color: "#fff", fontSize: 45 }} />

        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Playfair Display"
          }}
        >
          Girl Power
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontSize: 18
          }}
        >
          Beleza • Autoestima • Confiança
        </Typography>
      </Box>
    </Box>
  );
}