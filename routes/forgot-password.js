const router = require('express').Router();
const UsersignUp = require("../models/userSignupSchema");
const nodeMailer = require('nodemailer');
const randomString = require('randomstring');



router.get('/',(req,res,next)=>{
    res.render('forgot-password');
})


router.post('/',async (req,res)=>{
const {email} = req.body;
// console.log(req.body.email);
const data = await UsersignUp.findOne({email:email});

if(data){
   const random = Math.round(Math.random()*1000000);
//    const gen_randomString = randomString.generate();
   const daat =await UsersignUp.updateOne({email:email},{$set:{token:random}});

   console.log(daat);

   const forgotMail =require('../services/forgotEService');
   forgotMail({
    from:"spysent@gmail.com",
    to:email,
    subject:"Forgot-Password request",
    html: require('../services/forgotETemplate')({
        emailFrom:"spysent.com",
        token:random
    })
   })
    res.status(200).send({success:true,msg:"please check your inbox of email and reset your password!"})
}else{
    res.status(200).send({success:false,msg:`User with email:${email} is not registered!`})
}
})

router.post('/token',async(req,res)=>{
    console.log(req.body);
    const data = await UsersignUp.findOne({token:req.token});
    if(data){
        res.status(200).send({success:true})
    }else{
        res.status(500).send({success:false})
    }
})

module.exports=router;