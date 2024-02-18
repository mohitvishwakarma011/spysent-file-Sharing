const router = require("express").Router();

router.get("/", (req, res) => {
  if(req.user) return res.redirect("/aloginhome");
  
  res.render("home");
});

module.exports = router;
