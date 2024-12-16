import dbConnect from "../../../../lib/dbConnect";
import Team from "../../../../models/Team";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res
            .status(401)
            .json({ success: false, message: "Нет токена аутентификации." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { name, discipline, members } = req.body;

        if (!name || !discipline || !Array.isArray(members)) {
          return res.status(400).json({
            success: false,
            message: "Пожалуйста, заполните все поля.",
          });
        }

        const newTeam = await Team.create({
          name,
          discipline,
          members,
          owner: decoded.id,
        });

        res.status(201).json({ success: true, data: newTeam });
      } catch (error) {
        console.error("Ошибка при создании команды:", error);
        res.status(500).json({
          success: false,
          message: "Произошла ошибка при создании команды.",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Метод ${method} не разрешен.`);
      break;
  }
}
