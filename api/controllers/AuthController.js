const JwtService = require('../services/JwtService');
const { passport } = require('../../config/passport');

module.exports = {
  google: (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
  },

  googleCallback: (req, res) => {
    passport.authenticate('google', { session: false }, (err, user) => {
      if (err || !user) {
        return res.redirect('http://localhost:5173/login?error=failed');
      }

      const token = JwtService.issue({ id: user.id, email: user.email });
      const userData = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
      };

      // Redirect về frontend kèm token và thông tin user
      const redirectUrl = `http://localhost:5173/login?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
      return res.redirect(redirectUrl);
    })(req, res);
  }
};
