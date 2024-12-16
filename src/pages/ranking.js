// src/pages/ranking.js
import Header from "../components/Header";
import { Container, Typography, Box } from "@mui/material";

export default function RankingPage() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Рейтинг команд/игроков
        </Typography>
        <Typography variant="body1">
          В будущем здесь будет рейтинг. Пока оставляем место.
        </Typography>
        {/* Можно добавить таблицу или список для будущего рейтинга */}
        <Box
          sx={{
            border: "1px solid #444",
            p: 2,
            mt: 4,
            borderRadius: "8px",
            backgroundColor: "#1f2833",
            boxShadow: "0 0 10px rgba(0, 120, 215, 0.5)",
          }}
        >
          <Typography variant="h6">Рейтинг пока не доступен</Typography>
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
