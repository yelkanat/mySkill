// src/pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Header from "../components/Header";
import Image from "next/image";
import BannerSlider from "../components/BannerSlider"; // Предполагаем, что вы создали этот компонент

const tournaments = [
  {
    id: 1,
    name: "Турнир #1",
    description: "Предстоящий турнир",
    image: "/images/placeholder-tournament.jpg",
  },
  {
    id: 2,
    name: "Турнир #2",
    description: "Скоро стартует",
    image: "/images/placeholder-tournament.jpg",
  },
  {
    id: 3,
    name: "Турнир #3",
    description: "Присоединяйтесь сейчас",
    image: "/images/placeholder-tournament.jpg",
  },
  // Добавьте больше турниров по необходимости
];

export default function HomePage() {
  const router = useRouter();
  const { name, avatar } = router.query;

  useEffect(() => {
    if (!router.isReady) return; // Ждём, пока роутер будет готов

    if (name && avatar) {
      // Сохраняем данные пользователя в localStorage
      const userData = {
        name: decodeURIComponent(name),
        avatar: decodeURIComponent(avatar),
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Удаляем параметры из URL после сохранения данных
      router.replace("/", undefined, { shallow: true });
    }
  }, [router.isReady, name, avatar, router]);

  return (
    <>
      <Header />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        {/* Главный баннер-слайдер */}
        <BannerSlider />

        {/* Информация о платформе */}
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "text.primary", mb: 2 }}>
            Добро пожаловать в My Skill
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.primary", maxWidth: 800, mx: "auto" }}
          >
            My Skill — это ваша платформа для участия в киберспортивных
            турнирах, развития навыков и общения с единомышленниками. Создавайте
            команды, соревнуйтесь с лучшими игроками и достигайте новых высот в
            своих любимых играх! Присоединяйтесь к нам, и мы вместе поднимем
            ваши навыки на новый уровень.
          </Typography>
        </Box>

        {/* Показатели и статистика */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 4, color: "text.primary" }}
          >
            Наши достижения
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                  boxShadow: "0 0 10px rgba(0, 120, 215, 0.3)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                  100+
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Активных турниров
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                  boxShadow: "0 0 10px rgba(0, 120, 215, 0.3)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                  5000+
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Участников
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                  boxShadow: "0 0 10px rgba(0, 120, 215, 0.3)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                  200+
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Игровых дисциплин
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                  boxShadow: "0 0 10px rgba(0, 120, 215, 0.3)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "text.primary", mb: 1 }}>
                  50+
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Страны участников
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Последние турниры */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 4, color: "text.primary" }}
          >
            Последние турниры
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {tournaments.map((tournament) => (
              <Grid item xs={12} sm={6} md={4} key={tournament.id}>
                <Card
                  sx={{
                    border: "1px solid #444", // Приглушённая граница
                    borderRadius: "8px",
                    backgroundColor: "background.paper",
                    boxShadow: "0 0 10px rgba(0, 120, 215, 0.3)", // Мягкая тень
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "150px",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={tournament.image}
                      alt={`${tournament.name} Image`}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: "text.primary", mb: 1 }}
                    >
                      {tournament.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2 }}
                    >
                      {tournament.description}
                    </Typography>
                    <Button variant="contained" color="secondary" fullWidth>
                      Подробнее
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Новости и обновления */}
        <Box sx={{ my: 6 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 4, color: "text.primary" }}
          >
            Новости и обновления
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Пример новости */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: "1px solid #444",
                  borderRadius: "8px",
                  backgroundColor: "background.paper",
                  boxShadow: "0 0 10px rgba(0, 120, 215, 0.3)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "150px",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68" // Внешнее изображение
                    alt="Новость 1"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "text.primary", mb: 1 }}
                  >
                    Новость #1
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 2 }}
                  >
                    Краткое описание новости или обновления на платформе.
                  </Typography>
                  <Button variant="contained" color="secondary" fullWidth>
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* Добавьте другие новости аналогично */}
          </Grid>
        </Box>

        {/* Отзывы пользователей */}
        <Box
          sx={{
            my: 6,
            backgroundColor: "#1f2833",
            p: 4,
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 120, 215, 0.3)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 4, color: "text.primary" }}
          >
            Отзывы пользователей
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Пример отзыва */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Image
                  src="/images/user-avatar1.jpg" // Замените на реальный путь к аватару пользователя
                  alt="Пользователь 1"
                  width={80}
                  height={80}
                  style={{ borderRadius: "50%" }}
                />
                <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
                  Иван Иванов
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  "Отличная платформа для участия в турнирах! Очень удобный
                  интерфейс и отличная поддержка."
                </Typography>
              </Box>
            </Grid>
            {/* Добавьте другие отзывы аналогично */}
          </Grid>
        </Box>
      </Container>

      {/* Футер */}
      <footer
        style={{
          textAlign: "center",
          borderTop: "1px solid #444", // Приглушённая граница
          padding: "20px",
          marginTop: "auto",
          color: "#66fcf1", // Используем цвет из темы для текста футера
        }}
      >
        <Typography variant="body2">
          © PVP Platform, All rights reserved
        </Typography>
      </footer>
    </>
  );
}
