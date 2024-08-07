const moongoose=require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    moongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser : true,
        // useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })
}



/*
 configuring mongoDB
 Steps:
 exporting the function to call connect
 1.mongoose.connect() => returns Promise
 parameter to be passed will be 
    i.passing the URL of MongoDB
    ii.2nd is Object containing options
        a.useNewUrlParser
        b.useUnifiedTopology
 .then if connected to database
 .catch if not connected to database
*/
