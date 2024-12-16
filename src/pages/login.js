// src/pages/login.js
import { Container, Typography, Button, Box } from "@mui/material";
import Header from "../components/Header";

export default function LoginPage() {
  const handleSteamLogin = () => {
    window.location.href = "/api/auth/steam";
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Вход на PVP Platform
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSteamLogin}
            sx={{
              backgroundColor: "#0078d7",
              color: "#ffffff",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
              boxShadow: "0 0 10px #0078d7",
              "&:hover": {
                backgroundColor: "#005a9e",
                boxShadow: "0 0 20px #005a9e",
              },
            }}
          >
            Войти через Steam
          </Button>
        </Box>
      </Container>
    </>
  );
}
