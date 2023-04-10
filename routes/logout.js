const router  = require('express').Router();

router.get('/',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(`error while destroying session:- ${err}`)
        }else{
            res.redirect('/signup');
        }
    })
})

module.exports = router;