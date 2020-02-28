const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Failed to verify', error })
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};