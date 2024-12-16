// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  steamId: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String, // URL или путь к аватару
    required: false,
  },
  // Добавьте другие поля по необходимости
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
