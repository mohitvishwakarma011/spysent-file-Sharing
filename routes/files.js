const router = require("express").Router();

const multer = require("multer");

const path = require("path");

const File = require('../models/file');

const {v4: uuid4} = require('uuid');

//________________________________________________________________________________________________________

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
//_________________________________________________________________________________________________________
let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");


//_________________________________________________________________________________________________________

router.post("/", (req, res) => {
  

  //store file
  upload(req, res, async (err) => {

    // Validate request 

  if (!req.file) {
    return res.json({ error: "All fields are required. " });
  }


    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //store into database 

    const file =new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path : req.file.path,
        email:req.session.email,
        size: req.file.size
    })
      
    const response = await  file.save();
    return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`})

  });

  //response-> link
});


router.post('/send',async(req,res)=>{
  var {uuid,emailTo}= req.body;

  emailFrom=req.session.email;

  if(emailFrom==emailTo){
    res.send({success:false});

  }else{

  
 
  
  //validate request

  if(!uuid||!emailTo||!emailFrom){
    return res.status(422).send({error:'All fields are required'});
  }

  //get data from database 
  // const file = File.findOne({uuid:uuid}); this line modified.. chatGPT
  const file = await File.findOne({uuid:uuid}).exec();
  
  // console.log(file);
  if(file.sender){
    return res.status(422).send({error:'Email already sent.'}) 
  }

  file.sender= emailFrom;
  file.receiver= emailTo;
  // console.log("Working");
  const response = await file.save();
  // console.log(response);

  //send email:-

  const sendMail =require('../services/emailService');
  sendMail({
    from:emailFrom,
    to:emailTo,
    subject:"inShare file sharing",
    text:`${emailFrom} shared a e-mail with you.`,
    html: require('../services/emailTemplate')({
      emailFrom: emailFrom,
      downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size/1000)+' kb',
      expires:'24 hours'
    })
  })

  res.send({success:true});
}
})

module.exports = router;
