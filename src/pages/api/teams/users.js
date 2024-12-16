// pages/api/teams/users.js
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User"; // Предполагается, что у вас есть модель User

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({}); // Можете добавить фильтры по необходимости
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        console.error(error);
        res
          .status(400)
          .json({
            success: false,
            message: "Ошибка при получении пользователей.",
            error: error.message,
          });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Метод ${method} не разрешен`);
      break;
  }
}
