export default async function handler(req, res) {
  const query = req.query;

  // Проверяем аутентификацию
  const validationParams = new URLSearchParams(query);
  validationParams.set("openid.mode", "check_authentication");

  const validationResponse = await fetch(
    "https://steamcommunity.com/openid/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: validationParams.toString(),
    }
  );

  const validationText = await validationResponse.text();
  if (!validationText.includes("is_valid:true")) {
    return res.status(401).send("OpenID validation failed");
  }

  // Извлекаем steamid
  const claimedId = query["openid.claimed_id"];
  const steamId = claimedId.match(/\d+$/)[0];

  // Запрашиваем профиль игрока
  const profileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`;
  const profileResponse = await fetch(profileUrl);
  const profileData = await profileResponse.json();
  const player = profileData.response.players[0];

  // Выводим имя пользователя в консоль сервера
  console.log("Steam username:", player.personaname);

res.redirect(
  `/?name=${encodeURIComponent(player.personaname)}&avatar=${encodeURIComponent(
    player.avatarfull
  )}`
);

}
