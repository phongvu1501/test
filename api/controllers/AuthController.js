// const JwtService = require('../services/JwtService');
// const { passport } = require('../../config/passport');

// module.exports = {
//   google: (req, res) => {
//     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
//   },

//   googleCallback: (req, res) => {
//     passport.authenticate('google', { session: false }, (err, user) => {
//       if (err || !user) {
//         return res.redirect('http://localhost:5173/login?error=failed');
//       }

//       const token = JwtService.issue({ id: user.id, email: user.email });
//       const userData = {
//         id: user.id,
//         fullName: user.fullName,
//         email: user.email,
//         avatar: user.avatar
//       };

//       // Redirect về frontend kèm token và thông tin user
//       const redirectUrl = `http://localhost:5173/login?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
//       return res.redirect(redirectUrl);
//     })(req, res);
//   }
// };


// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID ,
// clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
// callbackURL: process.env.GOOGLE_CALLBACK_URL
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Tìm user theo googleId
//     let user = await Account.findOne({ googleId: profile.id });

//     // Nếu chưa có thì tạo mới
//     if (!user) {
//       user = await Account.create({
//         googleId: profile.id,
//         fullName: profile.displayName,
//         email: profile.emails[0].value,
//         password: null,  // vì Google login, không có password
//         avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
//         role: 'student'
//       }).fetch();
//     }

//     return done(null, user);
//   } catch (err) {
//     return done(err, null);
//   }
// }));

// module.exports = { passport };
