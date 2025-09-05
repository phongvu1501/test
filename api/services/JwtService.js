const jwt = require('jsonwebtoken');

module.exports = {
  issue(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET || '52439b4cdd5020150bfb6ef0e036fdcc',
      { expiresIn: '7d' }
    );
  },

  verify(token, callback) {
    return jwt.verify(token, process.env.JWT_SECRET || '52439b4cdd5020150bfb6ef0e036fdcc', callback);
  }
};
