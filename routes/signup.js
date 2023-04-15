const router = require("express").Router();
const UsersignUp = require("../models/userSignupSchema");
const validateSignUpData = require("../validation/validatesignup");

const multer = require("multer");
const upload = multer();
router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/new", upload.none(), async (req, res) => {

  //validation:-
  let errors = validateSignUpData(req.body);
  // console.log(errors.errors);
  if(Object.keys(errors.errors).length>0){
    res.send(errors);
  }else{

    
    const foundData = await UsersignUp.findOne({ email: req.body.email });
  // console.log(foundData);
  if (foundData != null) {
    // console.log("User is already registered!");
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
    // console.log(usersaved);
    const toSend = {
      shouldreg: true,
      data: usersaved,
    };
    res.send(toSend);
  }
}
});


router.post("/exist", upload.none(), async (req, res) => {
  console.log(req.body.email);
  const foundData = await UsersignUp.findOne({ email: req.body.email });
  console.log(foundData);
  if (foundData != null) {
    if(foundData.password==req.body.password){

      req.session.username=foundData.username;
      req.session.email=foundData.email;
      
      // console.log(req.session.email,req.session.username);
      const toSend = {
        shouldlogin: true,
        data: foundData,
      };
  
      
      // res.render('ALoginHome',{usersName:req.session.username});
      res.send(toSend);
      //  console.log(req.body);
    }else{
     
          res.send({
            IP:"you have entered Invalid Password!"
          })
         }
  } else {
    const toSendData = {
      shouldlogin: false,
      data: foundData,
    };
    res.send(toSendData);
  }
});
module.exports = router;
