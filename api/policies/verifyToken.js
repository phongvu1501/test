module.exports = async function (req, res, proceed) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.forbidden({ error: 'No token provided' });

  JwtService.verify(token, (err, decoded) => {
    if (err) return res.forbidden({ error: 'Invalid token' });
    req.user = decoded;
    return proceed();
  });
};
