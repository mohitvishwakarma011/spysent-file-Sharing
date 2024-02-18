const isAuthenticate = require("../config/isAuthenticate");

const router = require("express").Router();

router.get("/", isAuthenticate, (req, res) => {

  res.render("sendfile", { userName: req.user.username });
  // res.render("sendfile"); 
});

module.exports = router;
