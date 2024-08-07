const mongoose=require("mongoose");
const mailSender=require("../utils/mailSender")

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        //gets expired in 5 minutes
        expireAfterSeconds: 60,
    }
})


//should be written before exporting
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email,"Verification Email from codeWay",otp);
    }
    catch(error){
        throw error;
    }
}

//pre or postmiddleware Schema ke baad exports se pehle
//premiddleware syntax (post kiya tha file wale mai) 
//pre hook
//user enter the data -> user gets a mail -> OTP Entry(Sended using PreMiddleware before save, in Otp Schema to send otp through mail) -> Submit Button -> DB Entry
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    //next middleware
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);