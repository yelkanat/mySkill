import dbConnect from "../../../../lib/dbConnect";
import Team from "../../../../models/Team";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        await Team.findByIdAndDelete(id);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const { name, discipline, members } = req.body;
        const updatedTeam = await Team.findByIdAndUpdate(
          id,
          { name, discipline, members },
          { new: true }
        );
        res.status(200).json({ success: true, data: updatedTeam });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE", "PUT"]);
      res.status(405).end(`Метод ${method} не разрешен.`);
      break;
  }
}
