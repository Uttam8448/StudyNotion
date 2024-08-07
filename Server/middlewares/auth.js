const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth middleware
exports.auth = async (req,res,next) =>{
    try{
        
        const token= req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }
        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            //adding user data to the request as we will need if he/she had to buy or create a course
            req.user = decode;

        }
        catch(error){
            return req.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went Wrong",
        })
    }
}
//isStudent
exports.isStudent = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Role not found"
        })
    }
}

//isInstructor
exports.isInstructor = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructors only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Role not found"
        })
    }
}

//
exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Role not found"
        })
    }
}