import dbConnect from "../../../../lib/dbConnect";
import Team from "../../../../models/Team";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res
            .status(401)
            .json({ success: false, message: "Нет токена." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const teams = await Team.find({ members: userId }).populate("members");

        res.status(200).json({ success: true, data: teams });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Ошибка сервера." });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Метод ${method} не разрешен.`);
      break;
  }
}
