require('dotenv').config();

const mongoose= require('mongoose');

function connectDB(){
    // Database Conection 

     mongoose.connect(process.env.MONGO_CONNECTION_URL,err => {
        if(err) throw err;
        console.log('connected to MongoDB');
     });


     
    //  const connection=mongoose.connection;

    //  mongoose.connection.once('open',()=>{
    //     console.log('Database connected.');
    //  }).catch(err =>{
    //     console.log("connecton failed.");
    //  })

    // mongoose.connect(URI,
    //     err => {
    //         if(err) throw err;
    //         console.log('connected to MongoDB')
    //     });

    //  mongoose.connection
    // .once('open', function () {
    //   console.log('MongoDB running');
    // })
    // .on('error', function (err) {
    //   console.log(err);
    // });
    

}

module.exports= connectDB;