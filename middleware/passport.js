const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET_ID}`,
      callbackURL: "http://localhost:3000/dashboard",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
