export default async function handler(req, res) {
  const returnTo = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/steam/return`;
  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": returnTo,
    "openid.realm": process.env.NEXT_PUBLIC_SITE_URL,
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
  });
  res.redirect(`https://steamcommunity.com/openid/login?${params.toString()}`);
}
