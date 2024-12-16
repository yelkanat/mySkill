// Пример использования в TournamentsPage.js
import Header from "../components/Header";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import BannerSlider from "../components/BannerSlider";

export default function TournamentsPage() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Турниры
        </Typography>

        {/* Главный баннер-слайдер */}
        <BannerSlider />

        {/* Остальной контент страницы */}
        {/* ... */}
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
