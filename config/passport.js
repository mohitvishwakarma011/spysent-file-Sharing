const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const userSignupSchema = require("../models/userSignupSchema");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      userSignupSchema
        .findOne({ email: email })
        .then((user) => {
          if (!user)
            return done(null, false, {
              message: "The email is not registered!",
            });

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Incorrect username/password",
              });
            }
          });

          // if (password === user.password) return done(null, user);

          // return done(null, false, { message: "Incorrect Password" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user.id);
    });
  });

  passport.deserializeUser(function (id, cb) {
    userSignupSchema
      .findById(id)
      .then((user) => cb(null, user))
      .catch((err) => cb(err, null));
  });
};
