// src/pages/special.js
import Header from "../components/Header";
import { Container, Typography, Button, Box } from "@mui/material";

export default function SpecialPage() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, textAlign: "center", flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Спец. проект
        </Typography>
        {/* Лендинг-like страница */}
        <Box
          sx={{
            border: "1px solid #444",
            p: 4,
            boxShadow: "0 0 10px rgba(0, 120, 215, 0.5)",
            mb: 4,
            borderRadius: "8px",
            backgroundColor: "#1f2833",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Крупный ЛАН финал или турнир
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Описание события, призы, регламент.
          </Typography>
          <Button variant="contained" color="secondary" href="/register">
            Регистрация
          </Button>
        </Box>
      </Container>
      <footer
        style={{
          textAlign: "center",
          borderTop: "1px solid #444",
          padding: "20px",
          marginTop: "auto",
          color: "#66fcf1",
        }}
      >
        <Typography variant="body2">
          © PVP Platform, All rights reserved
        </Typography>
      </footer>
    </>
  );
}
