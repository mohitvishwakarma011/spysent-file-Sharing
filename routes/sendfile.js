const router  = require('express').Router();

router.get('/',(req,res)=>{
    console.log(req.session.username);
    res.render('sendfile',{userName:req.session.username});
   
})

module.exports = router;