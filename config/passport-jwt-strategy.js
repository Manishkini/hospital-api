const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'pandemic',
};

passport.use(
  new JWTStrategy(options, (payload, done) => {
    // no need to get password so not selecting password using second parameter
    Doctor.findById(payload._id, { password: 0 }, (err, doctor) => {
      if (err) {
        return done(err);
      }
      if (doctor) {
        return done(null, doctor);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
