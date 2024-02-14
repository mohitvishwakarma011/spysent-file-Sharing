const authenticate = require("../config/isAuthenticate");

const router = require("express").Router();

router.get("/", authenticate, (req, res) => {
  res.render("ALoginHome", { userName: req.session.username });
});

module.exports = router;
