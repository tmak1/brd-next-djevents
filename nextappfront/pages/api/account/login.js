import cookie from 'cookie';

const { NEXT_PUBLIC_API_URL } = process.env;

async function handleLogin(req, res) {
  if (!req.method === 'POST') {
    return res
      .setHeader('Allow', ['POST'])
      .status(405)
      .json({ message: `Requested method ${req.method} is not allowed` });
  }
  const { identifier, password } = req.body;
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    return res
      .status(data.statusCode)
      .json({ message: data.message[0].messages[0].message });
  }
  const { jwt, user } = data;
  res
    .setHeader(
      'Set-Cookie',
      cookie.serialize('JWT', jwt, {
        httpOnly: true,
        maxAge: 60 * 60,
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
      })
    )
    .status(200)
    .json({ user, jwt });
}

export default handleLogin;
