import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Название команды обязательно"],
    },
    discipline: {
      type: String,
      required: [true, "Дисциплина обязательна"],
    },
    members: [
      {
        type: String, // ID участников
        required: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
