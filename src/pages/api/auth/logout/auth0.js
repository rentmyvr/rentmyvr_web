export default async function handler(req, res) {
  const returnTo = encodeURI(`${process.env.NEXTAUTH_URL}/login`);
  res.redirect(`https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${returnTo}`);
}
