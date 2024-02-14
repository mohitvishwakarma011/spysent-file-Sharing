const jwt = require("jsonwebtoken");
const secret = "Moit$200211$";


const setJwtAuthentication = (req, res, next) => {
  const { username, email } = req.body;

  const token = jwt.sign(
    {
      username,
      email,
    },
    secret
  );
 res.cookie("myuid",token);
 next();
}; 

const getJwtAuthentication = (req,res,next)=>{
    const uid = req.cookies.myuid;

    const verified = jwt.verify(uid,secret);
    console.log("verification : - ",verified);
    res.send("Kooo");
}

module.exports = { setJwtAuthentication,getJwtAuthentication};
