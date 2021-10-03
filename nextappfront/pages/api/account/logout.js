import cookie from 'cookie';

async function handleLogout(req, res) {
  if (!req.method === 'POST') {
    return res
      .setHeader('Allow', ['POST'])
      .status(403)
      .json({ message: `Requested method ${req.method} not allowed` });
  }
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('JWT', '', {
      httpOnly: true,
      maxAge: new Date(0),
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
    })
  );
  res.status(200).json({ message: 'Success' });
}

export default handleLogout;
