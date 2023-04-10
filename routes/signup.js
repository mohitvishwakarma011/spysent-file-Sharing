const router = require("express").Router();
const UsersignUp = require("../models/userSignupSchema");
// const validateSignUpData = require("../validation/validatesignup");

const multer = require("multer");
const upload = multer();
router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/new", upload.none(), async (req, res) => {
  const foundData = await UsersignUp.findOne({ username: req.body.username });
  console.log(foundData);
  if (foundData != null) {
    console.log("User is already registered!");
    const toSend = {
      shouldreg: false,
      data: foundData,
    };
    res.send(toSend);
  } else {
    const user = new UsersignUp({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const usersaved = await user.save();
    console.log(usersaved);
    const toSend = {
      shouldreg: true,
      data: usersaved,
    };
    res.send(toSend);
  }
});


router.post("/exist", upload.none(), async (req, res) => {
  const foundData = await UsersignUp.findOne({ username: req.body.username });
  console.log(foundData);
  if (foundData != null) {
    req.session.username=req.body.username;
    console.log("User is registered..can log him in!");
    const toSend = {
      shouldlogin: true,
      data: foundData,
    };

    
    // res.render('ALoginHome',{usersName:req.session.username});
    res.send(toSend);
    //  console.log(req.body);
  } else {
    const toSendData = {
      shouldlogin: false,
      data: foundData,
    };
    res.send(toSendData);
  }
});
module.exports = router;
