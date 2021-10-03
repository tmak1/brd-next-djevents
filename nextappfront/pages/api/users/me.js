import cookie from 'cookie';

const { NEXT_PUBLIC_API_URL } = process.env;

async function handleUser(req, res) {
  if (!req.method === 'GET') {
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .json({ message: `Requested method ${req.method} not allowed` });
  }
  if (!req.headers.cookie) {
    return res.status(403).json({ message: 'Forbidden request' });
  }
  const { JWT } = cookie.parse(req.headers.cookie || '');
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${JWT}` },
  });
  const data = await response.json();
  if (!response.ok) {
    res.status(data.statusCode).json({ message: data.message });
  }
  res.status(200).json({ user: data });
}

export default handleUser;
