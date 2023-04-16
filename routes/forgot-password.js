const router = require('express').Router();
const UsersignUp = require("../models/userSignupSchema");



router.get('/',(req,res,next)=>{
    res.render('forgot-password');
})
router.post('/',async (req,res,next)=>{
const {email} = req.body;
const data = await UsersignUp.findOne({email:email});
res.send("I got this data "+data)
})

module.exports=router;