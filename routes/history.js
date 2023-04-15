const File = require('../models/file');

const router = require('express').Router()

router.get('/',async(req,res)=>{
    const data = await File.find({email:req.session.email}) 
    console.log("data is :-",data);
    res.render('history',{userName:req.session.username,datum:data}); 
    // res.send("data found");
})

module.exports = router;