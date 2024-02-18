const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please logIn to view this resource. Thank You!");
  res.redirect("/users/login");
};

module.exports = authenticateUser;
