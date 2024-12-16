// pages/create-team.js
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Header from "../components/Header";
import axios from "axios";

export default function CreateTeam() {
  const [name, setName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Загрузка списка пользователей
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/teams/users");
        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error(err);
        setError("Ошибка при загрузке пользователей.");
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Очистка сообщений
    setMessage(null);
    setError(null);

    // Валидация на фронтенде
    if (!name || !discipline || members.length === 0) {
      setError("Пожалуйста, заполните все поля и добавьте участников.");
      return;
    }

    if (members.length > 5) {
      setError("В команде может быть максимум 5 участников.");
      return;
    }

    try {
      const res = await axios.post("/api/teams/create", {
        name,
        discipline,
        members,
      });

      if (res.data.success) {
        setMessage("Команда успешно создана!");
        setName("");
        setDiscipline("");
        setMembers([]);
      } else {
        setError(res.data.message || "Ошибка при создании команды.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Ошибка при создании команды.");
    }
  };

  const handleMembersChange = (event) => {
    const {
      target: { value },
    } = event;
    setMembers(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Создать команду
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          {message && (
            <Typography variant="body1" sx={{ color: "green", mb: 2 }}>
              {message}
            </Typography>
          )}
          {error && (
            <Typography variant="body1" sx={{ color: "red", mb: 2 }}>
              {error}
            </Typography>
          )}
          <Grid container spacing={2}>
            {/* Название команды */}
            <Grid item xs={12}>
              <TextField
                label="Название команды"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            {/* Дисциплина */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="discipline-label">Дисциплина</InputLabel>
                <Select
                  labelId="discipline-label"
                  value={discipline}
                  label="Дисциплина"
                  onChange={(e) => setDiscipline(e.target.value)}
                >
                  <MenuItem value="Counter-Strike">Counter-Strike</MenuItem>
                  <MenuItem value="PUBG">PUBG</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Участники */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="members-label">Участники</InputLabel>
                <Select
                  labelId="members-label"
                  multiple
                  value={members}
                  onChange={handleMembersChange}
                  renderValue={(selected) =>
                    selected
                      .map((id) => {
                        const user = users.find((u) => u._id === id);
                        return user ? user.name : "Unknown";
                      })
                      .join(", ")
                  }
                  label="Участники"
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      <Checkbox checked={members.indexOf(user._id) > -1} />
                      <ListItemText primary={user.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Выбрано: {members.length} / 5
              </Typography>
            </Grid>
            {/* Кнопка отправки */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Создать
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
