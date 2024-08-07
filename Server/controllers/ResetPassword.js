//Different from change password
//reset -> mail link send -> frontend ->choose new password

//resetPassword Taken

// resetPassword

const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//token is made in this function in order that the is which is to be updated can be found and update easily
exports.resetPasswordToken = async (req,res)=>{
    try{
            //get email from req body
        const email= req.body.email;
        //check user for this email,email validation
        const user =await User.findOne({email:email});
        if(!user){
            return res.json({success:false,
                message:"Your mail is not registered with us",
            })
        }
        //need to create a token(generate it)
        const token= crypto.randomBytes(20).toString("hex");

        //updating in db
        //update user by adding token and expiration time  
        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*60*1000,
            },
            //this enables that updated details come in return
            {new:true},
        )
        //create url
        //sennd mail containing the url of frontend
        //return response
        
        //frontend link
        const  url=`http://localhost:3000/update-password/${token}`
        await mailSender(email,"Password Reset Link",`Password Reset Link : ${url} `);

        //return response
        return res.json({
            success:true,
            message:"Email sent successfully,Please Check email and change password accordingly",
        })

  }
  catch(error){
    return res.status(500).json({
        success:false,
        message:"Something went wrong while reseting password",
    })
  }
}

//token is used to find the user whose password to be updated
exports.resetPassword = async (req,res) =>{
    try{
        //take out request data
        //validation
        //get user details from db using token
        //if no entry for token invalid token
        //token time check
        //frontend se token body me aaya hai
        const {token,password,confirmPassword}=req.body;
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Passwords not matching!!",
            })
        }
        const userDetails=await User.findOne({token:token});
        if(!userDetails){
            res.json({
                success:false,
                message:"Token is invalid!!",
            })
        }
        if(!userDetails.resetPasswordExpires > Date.now()){
            return res.json({
                success:false,
                message:"Token Expired, please regenerate your token!!"
            })
        }
        //hash the password requires bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true},)
        return res.status(200).json({
            success:true,
            message:"Password reset successfull"
        })
    }
    catch(error){
        return res.status(500).json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
    }
} 
