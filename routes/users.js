const router = require("express").Router();
const UsersignUp = require("../models/userSignupSchema");
const validateSignUpData = require("../validation/validatesignup");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/new", async (req, res) => {
  const { username, email, password, re_password } = req.body;

  //validation:-
  let errors = validateSignUpData({
    username,
    email,
    password,
    re_password,
  });

  if (errors.length > 0)
    return res.render("signup", {
      errors,
      username,
      email,
      password,
      re_password,
    });

  //check if user exists already

  const userData = await UsersignUp.findOne({ email: email });

  if (userData)
    return res.render("signup", {
      error_msg: "this email is already registered!",
      username,
      email,
      password,
      re_password,
    });

  //! else create a new user
  const newUser = new UsersignUp({
    username,
    email,
    password,
  });

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, async function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
      await newUser.save();

      return res.render("login", {
        success_msg: "Registered successfully. You can login!",
      });
    });
  });
});

router.post("/exist", async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/aloginhome",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle error, for example, logging it or sending an error response
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    req.flash("success_msg", "You are logged out!");
    res.redirect("/users/login");
  });
});

module.exports = router;
