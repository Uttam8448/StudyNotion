const User=require("../models/User");
const Profile = require("../models/Profile");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//Personal Details
//Optional Details
//gender DOB 
require("dotenv").config();

//as we had created the user profile before we dont need to create new and just need to update the Profile entry
exports.updateProfile = async (req,res) =>{
    try{    
        //get data
        //get userId
        //validation
        //find profile
        //update profile
        //return response
        
        //contactNumber and gender is not optional thus there data will come in request whereas if other doont come we had declared it default
        const {gender="" ,dateOfBirth="",about="",contactNumber}= req.body;
        
        const id= req.user.id;
       
        if(!contactNumber || !id){
            return res.status(400).json({
                success:false,
                message:"Fill all required fields!"
            })
        }
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //no need to create as profile had been already created by user
        profileDetails.gender=gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;

        ///just saving not create
        await profileDetails.save();
        
        //GLITCH:Here the contact Number of the user is gonna send to the user can be breach in middle
        return res.json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in profile updation",
            error:error.message,
        })
    }
}

//Bussiness Logic
//How to schedule a job like deleteAccount after some days
exports.deleteAccount = async (req,res) =>{
    //getting id
    //validation
    //delete profile
    //delete user
    try{
        const id  = req.user.id;

        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not Found",
            })
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User deleted Successfully",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in User Deletion",
            error:error.message,
        })
    }
}


exports.getAllUserDetails = async (req,res) =>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id)
                            .populate("additionalDetails")
                            .exec();
        //return res
        return res.status(200).json({
            success:true,
            data:userDetails,
            message:"User data fetch Successfully",
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in getting all user details",
            error:error.message,
        })
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id;
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};