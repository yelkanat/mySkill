import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
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
} from "@mui/material";
import Link from "./Link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [user, setUser] = useState(null);

  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [memberIDs, setMemberIDs] = useState([""]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Загрузка пользователя и команд из localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedTeams = JSON.parse(localStorage.getItem("teams") || "[]");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("user");
        }
      }
      setTeams(storedTeams);
    }
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMemberIDChange = (index, value) => {
    const updatedMembers = [...memberIDs];
    updatedMembers[index] = value;
    setMemberIDs(updatedMembers);
  };

  const addMemberField = () => {
    if (memberIDs.length < 5) {
      setMemberIDs([...memberIDs, ""]);
    }
  };

  const removeMemberField = (index) => {
    setMemberIDs(memberIDs.filter((_, i) => i !== index));
  };

  const handleCreateTeam = () => {
    const filteredMemberIDs = memberIDs
      .map((id) => id.trim())
      .filter((id) => id !== "");
    const uniqueMembers = [...new Set(filteredMemberIDs)];

    if (!teamName || !discipline || uniqueMembers.length === 0) {
      setSnackbar({
        open: true,
        message: "Заполните все поля и добавьте участников.",
        severity: "error",
      });
      return;
    }

    if (uniqueMembers.length > 5) {
      setSnackbar({
        open: true,
        message: "Максимум 5 участников в команде.",
        severity: "error",
      });
      return;
    }

    const newTeam = {
      id: Date.now(),
      name: teamName,
      discipline,
      members: uniqueMembers,
    };

    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    setTeamName("");
    setDiscipline("");
    setMemberIDs([""]);
    setOpen(false);
    setSnackbar({
      open: true,
      message: "Команда создана!",
      severity: "success",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                MY_SKILL
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link href="/" passHref>
              <Button color="inherit">Главная</Button>
            </Link>
            <Link href="/tournaments" passHref>
              <Button color="inherit">Турниры</Button>
            </Link>
            <Link href="/live" passHref>
              <Button color="inherit">Live</Button>
            </Link>
            <Link href="/ranking" passHref>
              <Button color="inherit">Рейтинг</Button>
            </Link>
            <Link href="/gallery" passHref>
              <Button color="inherit">Галерея</Button>
            </Link>
            <Link href="/teams" passHref>
              <Button color="inherit">Команды</Button>
            </Link>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#435971",
                "&:hover": { backgroundColor: "#2e3d4c" },
              }}
              onClick={handleClickOpen}
            >
              Создать команду
            </Button>
            {!user ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#435971",
                  "&:hover": { backgroundColor: "#2e3d4c" },
                }}
                onClick={() => (window.location.href = "/api/auth/steam")}
              >
                Войти через Steam
              </Button>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar src={user?.avatar} alt="Avatar" />
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  {user?.name}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Модальное окно создания команды */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Создать команду</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Название команды"
              fullWidth
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Дисциплина</InputLabel>
              <Select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
              >
                <MenuItem value="Counter-Strike">Counter-Strike</MenuItem>
                <MenuItem value="PUBG">PUBG</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Typography>Участники (ID)</Typography>
              {memberIDs.map((id, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <TextField
                    label={`ID участника ${index + 1}`}
                    fullWidth
                    value={id}
                    onChange={(e) =>
                      handleMemberIDChange(index, e.target.value)
                    }
                  />
                  {memberIDs.length > 1 && (
                    <Button
                      onClick={() => removeMemberField(index)}
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
                  onClick={addMemberField}
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  Добавить участника
                </Button>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            onClick={handleCreateTeam}
            variant="contained"
            color="primary"
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}
