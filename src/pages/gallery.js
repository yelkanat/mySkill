// src/pages/gallery.js
import Header from "../components/Header";
import { Container, Typography, Box } from "@mui/material";

export default function GalleryPage() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Галерея
        </Typography>
        <Typography variant="body1">
          Фото с турниров с watermark "Myskill".
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
          {/* Пример карточки изображения */}
          <Box
            sx={{
              width: "200px",
              height: "200px",
              border: "1px solid #444", // Приглушённая граница
              position: "relative",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 120, 215, 0.5)", // Мягкая тень
            }}
          >
            <img
              src="/images/placeholder.jpg" // Замените на реальный путь к изображению
              alt="Фото"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute", 
                bottom: "5px",
                right: "5px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#66fcf1", // Используем цвет текста из темы
                fontSize: "12px",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
            >
              Myskill
            </Box>
          </Box>
          {/* Добавьте другие карточки изображений аналогично */}
        </Box>
      </Container>
      <footer
        style={{
          textAlign: "center",
          borderTop: "1px solid #444", // Приглушённая граница
          padding: "20px",
          marginTop: "auto",
          color: "#66fcf1", // Используем цвет текста из темы
        }}
      >
        <Typography variant="body2">
          © PVP Platform, All rights reserved
        </Typography>
      </footer>
    </>
  );
}
