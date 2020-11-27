import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(403).send();
  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified;
  } catch (err) {
    return res.status(403).send();
  }
  next();
}

export default auth;
