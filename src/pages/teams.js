// pages/teams.js
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import withAuth from "../../hoc/withAuth"; // HOC для защиты страницы
import Link from "../components/Link"; // Пользовательский Link

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [editedTeamName, setEditedTeamName] = useState("");
  const [editedDiscipline, setEditedDiscipline] = useState("");
  const [editedMemberIDs, setEditedMemberIDs] = useState([""]);

  // Функция для загрузки команд пользователя
  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/teams/my", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setTeams(data.data);
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Ошибка при загрузке команд.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Ошибка при загрузке команд:", error);
      setSnackbar({
        open: true,
        message: "Ошибка при загрузке команд.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Функция для удаления команды
  const handleDeleteTeam = async (teamId) => {
    if (!confirm("Вы уверены, что хотите удалить эту команду?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setSnackbar({
          open: true,
          message: "Команда успешно удалена!",
          severity: "success",
        });
        fetchTeams();
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Ошибка при удалении команды.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Ошибка при удалении команды:", error);
      setSnackbar({
        open: true,
        message: "Ошибка при удалении команды.",
        severity: "error",
      });
    }
  };

  // Функция для открытия диалога редактирования команды
  const handleEditTeam = (team) => {
    setCurrentTeam(team);
    setEditedTeamName(team.name);
    setEditedDiscipline(team.discipline);
    setEditedMemberIDs(team.members.map((member) => member.steamId));
    setEditDialogOpen(true);
  };

  // Функция для закрытия диалога редактирования
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentTeam(null);
    setEditedTeamName("");
    setEditedDiscipline("");
    setEditedMemberIDs([""]);
  };

  // Функция для обработки изменений в полях редактирования
  const handleEditedMemberIDChange = (index, value) => {
    const updatedMemberIDs = [...editedMemberIDs];
    updatedMemberIDs[index] = value;
    setEditedMemberIDs(updatedMemberIDs);
  };

  // Функция для добавления нового поля ввода ID участника
  const addEditedMemberField = () => {
    if (editedMemberIDs.length < 5) {
      setEditedMemberIDs([...editedMemberIDs, ""]);
    }
  };

  // Функция для удаления поля ввода ID участника
  const removeEditedMemberField = (index) => {
    const updatedMemberIDs = editedMemberIDs.filter((_, i) => i !== index);
    setEditedMemberIDs(updatedMemberIDs);
  };

  // Функция для обновления команды
  const handleUpdateTeam = async () => {
    // Фильтруем пустые строки и убираем дубликаты
    const filteredMemberIDs = editedMemberIDs
      .map((id) => id.trim())
      .filter((id) => id !== "");
    const uniqueMemberIDs = [...new Set(filteredMemberIDs)];

    // Валидация ID
    const idPattern = /^[a-zA-Z0-9]+$/;
    for (let id of uniqueMemberIDs) {
      if (!idPattern.test(id)) {
        setSnackbar({
          open: true,
          message: `Некорректный ID: ${id}`,
          severity: "error",
        });
        return;
      }
    }

    if (!editedTeamName || !editedDiscipline || uniqueMemberIDs.length === 0) {
      setSnackbar({
        open: true,
        message: "Пожалуйста, заполните все поля и добавьте участников.",
        severity: "error",
      });
      return;
    }

    if (uniqueMemberIDs.length > 5) {
      setSnackbar({
        open: true,
        message: "В команде может быть максимум 5 участников.",
        severity: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/teams/${currentTeam._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editedTeamName,
          discipline: editedDiscipline,
          members: uniqueMemberIDs,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSnackbar({
          open: true,
          message: "Команда успешно обновлена!",
          severity: "success",
        });
        fetchTeams();
        handleEditDialogClose();
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Ошибка при обновлении команды.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении команды:", error);
      setSnackbar({
        open: true,
        message: "Ошибка при обновлении команды.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Мои команды
      </Typography>
      <List>
        {teams.length === 0 ? (
          <Typography variant="body1">У вас пока нет команд.</Typography>
        ) : (
          teams.map((team) => (
            <ListItem
              key={team._id}
              sx={{
                border: "1px solid #ccc",
                mb: 2,
                borderRadius: 2,
                padding: 2,
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="div">
                    {team.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Дисциплина: {team.discipline}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Участники:
                    </Typography>
                    <ul>
                      {team.members.map((member) => (
                        <li key={member._id}>
                          {member.name} (ID: {member.steamId})
                        </li>
                      ))}
                    </ul>
                  </>
                }
              />
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleEditTeam(team)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteTeam(team._id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))
        )}
      </List>

      {/* Диалог редактирования команды */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Редактировать команду</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            {/* Название команды */}
            <TextField
              label="Название команды"
              variant="outlined"
              fullWidth
              value={editedTeamName}
              onChange={(e) => setEditedTeamName(e.target.value)}
              required
              sx={{ mb: 3 }}
            />
            {/* Дисциплина */}
            <FormControl fullWidth required sx={{ mb: 3 }}>
              <InputLabel id="edited-discipline-label">Дисциплина</InputLabel>
              <Select
                labelId="edited-discipline-label"
                value={editedDiscipline}
                label="Дисциплина"
                onChange={(e) => setEditedDiscipline(e.target.value)}
              >
                <MenuItem value="Counter-Strike">Counter-Strike</MenuItem>
                <MenuItem value="PUBG">PUBG</MenuItem>
              </Select>
            </FormControl>
            {/* Участники - ввод ID */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Участники (ID)
              </Typography>
              {editedMemberIDs.map((id, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <TextField
                    label={`ID участника ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={id}
                    onChange={(e) =>
                      handleEditedMemberIDChange(index, e.target.value)
                    }
                    placeholder="Введите ID"
                  />
                  {editedMemberIDs.length > 1 && (
                    <Button
                      onClick={() => removeEditedMemberField(index)}
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Удалить
                    </Button>
                  )}
                </Box>
              ))}
              {editedMemberIDs.length < 5 && (
                <Button onClick={addEditedMemberField} variant="outlined">
                  Добавить участника
                </Button>
              )}
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Максимум 5 участников
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Отмена
          </Button>
          <Button
            onClick={handleUpdateTeam}
            variant="contained"
            color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default withAuth(TeamsPage);
