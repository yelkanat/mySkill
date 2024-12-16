// src/theme/theme.js
import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/400.css"; // Основной шрифт
import "@fontsource/roboto/700.css"; // Жирный шрифт

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1b2838", // Глубокий синий цвет, похожий на Steam
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0078d7", // Яркий синий цвет для акцентов
      contrastText: "#ffffff",
    },
    background: {
      default: "#0b0c10",
      paper: "#1f2833",
    },
    text: {
      primary: "#c5c6c7",
      secondary: "#66fcf1",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        /* Глобальные стили */
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1b2838", // Обновлённый цвет AppBar
          boxShadow: "none",
          borderBottom: "1px solid #444", // Приглушённая граница
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#0078d7", // Яркий синий для кнопок
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#005a9e",
          },
        },
        outlined: {
          borderColor: "#1b2838", // Приглушённая граница для кнопок
          color: "#0078d7",
          "&:hover": {
            borderColor: "#005a9e",
            backgroundColor: "rgba(0, 120, 215, 0.1)",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#c5c6c7",
        },
      },
    },
  },
});

export default theme;
