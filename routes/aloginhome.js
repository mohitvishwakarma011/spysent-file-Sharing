const router = require('express').Router();

router.get('/',(req,res)=>{
    
    res.render('ALoginHome',{userName:req.session.username});
})

module.exports = router;