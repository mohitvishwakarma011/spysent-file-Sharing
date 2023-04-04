// require('dotenv').config();

const mongoose= require('mongoose');

function connectDB(){
    // Database Conection 

    //  mongoose.connect('mongodb://MONGO_CONNECTION_URL',err => {
    //     if(err) throw err;
    //     console.log('connected to MongoDB');
    //  });


    mongoose.connect('mongodb://0.0.0.0:27017/File-Sharing').then(()=>{
        console.log('connected to database.');
    }).catch((e)=>{
        console.log(e+"\n unable to connected with database ");
    })
}

// connectDB();
module.exports= connectDB;