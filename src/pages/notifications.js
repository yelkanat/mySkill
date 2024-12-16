import Header from "../components/Header";
import { Container, Typography, Box, Button } from "@mui/material";

export default function NotificationsPage() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ textShadow: "0 0 5px #0ff", mb: 3 }}>
          Уведомления
        </Typography>
        <Box sx={{ border: "1px solid #0ff", p: 2, mb: 2 }}>
          <Typography variant="body1">
            Приглашение в команду "CyberWarriors"
          </Typography>
          <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
            Принять
          </Button>
          <Button variant="outlined" color="secondary">
            Отклонить
          </Button>
        </Box>
        <Box sx={{ border: "1px solid #0ff", p: 2 }}>
          <Typography variant="body1">
            Новое сообщение от администрации
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 1 }}>
            Посмотреть
          </Button>
        </Box>
      </Container>
    </>
  );
}
