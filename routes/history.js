const authenticateUser = require('../config/isAuthenticate');
const File = require('../models/file');

const router = require('express').Router()

router.get('/',authenticateUser,async(req,res)=>{
    const data = await File.find({email:req.user.email}) 
    // console.log("data is :-",data);
    res.render('history',{userName:req.user.username,datum:data}); 
    // res.send("data found");
})

module.exports = router;