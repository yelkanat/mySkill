// src/pages/live.js
import Header from "../components/Header";
import { Container, Typography, Box } from "@mui/material";

export default function LivePage() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Live
        </Typography>
        {/* Здесь можно встроить iframe со стримом или список текущих матчей */}
        <Box
          sx={{
            border: "1px solid #444",
            p: 2,
            borderRadius: "8px",
            backgroundColor: "#1f2833",
            boxShadow: "0 0 10px rgba(0, 120, 215, 0.5)",
          }}
        >
          <Typography variant="body1">
            Текущие трансляции или активные турниры
          </Typography>
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
