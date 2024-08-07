const User= require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile =require("../models/Profile");
require("dotenv").config();

//sendOtp
exports.sendOTP= async (req,res) =>{
    try{
        //fetching email from request body
       
        const {email} = req.body;
        //check if user already existed 
        const checkUserPresent = await User.findOne({email});

        //if user  already exist, then return an response 
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already exists!!",
            })
        }
        
        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
  
        //checking for any similar db entry otp
        const result=await OTP.findOne({otp:otp})
        
        //not good way -!!blunder
        //multiple DB calls 
        //use a library that gives only unique otp
        // looping until otp found is unique

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            //checking whether this otp is already used
            result=await OTP.findOne({otp:otp});
        }

        //no created at setting it to default
        const otpPayload = {email,otp};

        //create an entry in DB
        const otpBody = await OTP.create(otpPayload);

        //return response successfully
        return res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp,
        })
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
/*
otp generation
done using otpgenerator module
method: .generate function is used to build otp
parameters:
    i.length of password
    ii.options- consists of needed elements in the password such as upperCaseAlphabet lowerCaseAlphabet specialChars as key
    (make true if you want it compulsory false if you dont need it)
*/

//signup(otp additional)
exports.signUp=async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,//not in db model 
            accountType,//default
            contactNumber,  //not in db model but in ProfileDetail schema there
            otp }   = req.body;
        //validations
        if(!firstName||!lastName||!email||!password||!confirmPassword||!otp ){
            return res.status(403).json({
                success:false,
                message:"All fields are required ",
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match, please try again"
            })
        }

        //finding for user if already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User is already registered',
            });
        }
        
        
        //find most recent OTP stored for the user
        //-1 in createdAt indicates in decreasing order
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);


        //validating the otp
        if(recentOtp.length === 0) {
            //Otp not found
            return res.status(400).json({
                success:false,
                message:"OTP Not Found!!",
            })
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"OTP did not matched!!"
            })
        }


        //Hashing the Password recieved
        const hashedPassword = await bcrypt.hash(password, 10);
        //entry create in DB
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            //creating an image to the id
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        })

        //return res
        return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            newUser,
        })

    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Error in Signing Up!!",
        })
    }
}
/*
takes the inputs from request required to create the user using mongoose function create on model
validate the inputs as much you can

checks whether if the account is already created or not

**use bcrypt.hash to hash the password coming from the request after hashing put it into the database**

if created then return error
if not then hash the password and create and entry in the database with the hashed Password 
create a logo for user using an API of diceBear by giving the name
*/



//login
exports.login=async(req,res)=>{
    try{
        //get data from req body
        const {email,password}=req.body;

        //validation data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required, please try again"
            })
        }
        //user check exist or not
        const user=await User.findOne({email:email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does not exists!! Please signup first.",
            })
        }

        //generate JWT, after password matching
        //password match function compare hashed password with normal text password 
        if(await bcrypt.compare(password,user.password)){
            //preparing payload
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });


            //toObject() if not works
            //removing password from request
            //adding token to it for further authentication if required
            user.token = token;
            user.password=undefined;

            //create cookie and send response
            const options={
                expires:new Date(Date.now() + 3600000),
                httpOnly:true
            }

            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully"
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect!!",
            })
        }
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"Login Failure, Please Try Again",
        })
    }
}
/*
    Bcrypt is a popular choice for password hashing in Node.js due to its security and ease of use.
    bcrypt
*/


//changePassword
exports.changePassword = async (req,res) =>{
    //get data from req body
    //get oldPassword, newPassword, confirmNewPassword
    //validation
    //update password in database 
    //send mail - Password updated
    //return response
    try{
        const userDetails = await User.findById(req.user.id);

        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"The password was incorrect",
            })
        }

        if(confirmNewPassword && newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"The password and confirm password does not match",
            });
        }

        const encryptedPassword = await bcrypt.hash(newPassword,10);

        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password:encryptedPassword},
            {new: true}
        )
        
        try{
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
        }catch(error){
            console.error("Error occured while sending email:",error);
            return res.status(500).json({
                success:false,
                messaage:"Error occured while sending mail",
                error:error.messaage,
            })

        }
        return res.status(200).json({
            success:true,
            message:"Password updated successfully",
        })

    }catch(error){
        console.error("Error occured while updating password:",error);
        return res.status(500).json({
            success:false,
            message:"Error occurred while updating password",
            error:error.messaage,
        })
    }
}
 
/**changePassword  
 * match the hashed password in database and the old password coming in request using bcrypt.compare
 * bcrypt.hash to hash it 
 * post in the db
 * do mail once done
 * 
**/