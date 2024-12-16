// src/pages/profile.js
import Header from "../components/Header";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState([]);
  const [newNick, setNewNick] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [memberIDs, setMemberIDs] = useState([""]); // IDs участников команды
useEffect(() => {
  const storedTeams = JSON.parse(localStorage.getItem("teams") || "[]");
  setTeams(storedTeams);
}, []);


  const handleSaveNick = () => {
    const updatedUser = { ...user, name: newNick };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSnackbar({ open: true, message: "Ник сохранён", severity: "success" });
  };

  const handleCreateTeam = () => {
    if (!teamName || !discipline || memberIDs.some((id) => !id.trim())) {
      setSnackbar({
        open: true,
        message: "Заполните все поля",
        severity: "error",
      });
      return;
    }

    const newTeam = {
      id: Date.now(), // Уникальный ID команды
      name: teamName,
      discipline,
      members: memberIDs.filter((id) => id.trim()),
    };

    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    setTeamName("");
    setDiscipline("");
    setMemberIDs([""]);
    setSnackbar({
      open: true,
      message: "Команда создана",
      severity: "success",
    });
  };

  const handleDeleteTeam = (teamId) => {
    const updatedTeams = teams.filter((team) => team.id !== teamId);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setSnackbar({
      open: true,
      message: "Команда удалена",
      severity: "success",
    });
  };

  const handleEditTeam = (team) => {
    setCurrentTeam(team);
    setTeamName(team.name);
    setDiscipline(team.discipline);
    setMemberIDs(team.members);
    setEditDialogOpen(true);
  };

  const handleSaveEditedTeam = () => {
    if (!teamName || !discipline || memberIDs.some((id) => !id.trim())) {
      setSnackbar({
        open: true,
        message: "Заполните все поля",
        severity: "error",
      });
      return;
    }

    const updatedTeams = teams.map((team) =>
      team.id === currentTeam.id
        ? {
            ...team,
            name: teamName,
            discipline,
            members: memberIDs.filter((id) => id.trim()),
          }
        : team
    );

    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    setEditDialogOpen(false);
    setCurrentTeam(null);
    setTeamName("");
    setDiscipline("");
    setMemberIDs([""]);
    setSnackbar({
      open: true,
      message: "Команда обновлена",
      severity: "success",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Личный кабинет
        </Typography>

        {/* Настройки профиля */}
        <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Настройки профиля
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              src={user?.avatar}
              alt="Avatar"
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="body1">{user?.name}</Typography>
          </Box>
          <TextField
            variant="outlined"
            label="Новый ник"
            fullWidth
            value={newNick}
            onChange={(e) => setNewNick(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveNick}>
            Сохранить
          </Button>
        </Box>

        {/* Список команд */}
        <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Мои команды
          </Typography>
          <List>
            {teams.map((team) => (
              <ListItem
                key={team.id}
                sx={{ border: "1px solid #ccc", borderRadius: 2, mb: 2 }}
              >
                <ListItemText
                  primary={`${team.name} (${team.discipline})`}
                  secondary={`Участники: ${team.members.join(", ")}`}
                />
                <IconButton
                  color="primary"
                  onClick={() => handleEditTeam(team)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteTeam(team.id)}
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Создание команды
        <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Создать новую команду
          </Typography>
          <TextField
            label="Название команды"
            variant="outlined"
            fullWidth
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Дисциплина</InputLabel>
            <Select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              label="Дисциплина"
            >
              <MenuItem value="Counter-Strike">Counter-Strike</MenuItem>
              <MenuItem value="PUBG">PUBG</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Участники (ID)</Typography>
            {memberIDs.map((id, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <TextField
                  label={`ID участника ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={id}
                  onChange={(e) => {
                    const newIDs = [...memberIDs];
                    newIDs[index] = e.target.value;
                    setMemberIDs(newIDs);
                  }}
                />
                {memberIDs.length > 1 && (
                  <Button
                    onClick={() =>
                      setMemberIDs(memberIDs.filter((_, i) => i !== index))
                    }
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    Удалить
                  </Button>
                )}
              </Box>
            ))}
            {memberIDs.length < 5 && (
              <Button
                onClick={() => setMemberIDs([...memberIDs, ""])}
                variant="outlined"
                sx={{ mt: 1 }}
              >
                Добавить участника
              </Button>
            )}
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Максимум 5 участников
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTeam}
          >
            Создать команду
          </Button>
        </Box> */}

        {/* Редактирование команды */}
        {/* <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Редактировать команду</DialogTitle>
          <DialogContent>
            <TextField
              label="Название команды"
              variant="outlined"
              fullWidth
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Дисциплина</InputLabel>
              <Select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                label="Дисциплина"
              >
                <MenuItem value="Counter-Strike">Counter-Strike</MenuItem>
                <MenuItem value="PUBG">PUBG</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Участники (ID)</Typography>
              {memberIDs.map((id, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <TextField
                    label={`ID участника ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={id}
                    onChange={(e) => {
                      const newIDs = [...memberIDs];
                      newIDs[index] = e.target.value;
                      setMemberIDs(newIDs);
                    }}
                  />
                  {memberIDs.length > 1 && (
                    <Button
                      onClick={() =>
                        setMemberIDs(memberIDs.filter((_, i) => i !== index))
                      }
                      color="error"
                      sx={{ ml: 2 }}
                    >
                      Удалить
                    </Button>
                  )}
                </Box>
              ))}
              {memberIDs.length < 5 && (
                <Button
                  onClick={() => setMemberIDs([...memberIDs, ""])}
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  Добавить участника
                </Button>
              )}
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Максимум 5 участников
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="secondary">
              Отмена
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEditedTeam}
            >
              Сохранить
            </Button>
          </DialogActions>
        </Dialog> */}
      </Container>

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
    </>
  );
}

