// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID ,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
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
