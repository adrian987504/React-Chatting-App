const passport = require('passport');

exports.localLogin = async (req, res, next) => {
  const authPromise = new Promise((resolve, reject) =>
    passport.authenticate('local', { session: false, failWithError: true }, (err, user, info) => {
      if (err) {
        return reject(err);
      }

      if (!user) {
        return reject({ ...info, status: 401 });
      }
      
      return resolve(user);  
    })(req, res, next)
  );

  const user = await authPromise;

  res.locals.user = user;

  return next();
};

// exports.verifyFacebook = async (accessToken, refreshToken, profile, done) => {
//   const user = await User.findOne({
//     facebookId: profile.id
//   });

//   if (!user) {
//     const newUser = new User({
//       email: profile.emails[0].value,
//       firstName: profile.name.givenName,
//       lastName: profile.name.familyName,
//       isVerified: true
//     });

//     newUser.save();
//   }

//   User.findOrCreate({ facebookId: profile.id }, (error, user) => {
//     return done(error, user);
//   });
// };
