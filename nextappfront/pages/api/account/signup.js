import cookie from 'cookie';

const { NEXT_PUBLIC_API_URL } = process.env;

async function handleSignup(req, res) {
  if (!req.method === 'POST') {
    return res
      .setHeader('Allow', ['POST'])
      .status(405)
      .json({ message: `Requested method ${req.method} is not alloweed` });
  }
  const { username, email, password } = req.body;
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    return res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });
  }
  const { jwt, user } = data;
  res
    .setHeader('Set-Cookie', cookie.serialize('JWT', jwt))
    .status(200)
    .json({ user, jwt });
}

export default handleSignup;
