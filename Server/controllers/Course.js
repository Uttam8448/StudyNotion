const Course=require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


exports.createCourse = async (req,res) =>{
    try{
        //remove data
        //remove files
        //validation
        //instructor validation
        //category -> valid(if for backend for frontend there is dropdown for tags)
        //Image -> Coludinary
        //create course entry in DB
        //add course entry to user schema of instructor
        //User can be of 
        //add course entry to tags array

        //fetch data
        const {courseName,courseDescription, whatYouWillLearn, price, tag,category ,status ,instructions} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            res.status(400).json({
                success:false,
                message:"Incomplete Details! Fill your detail fully"
            })
        }

        //check for instructor as you need to store the objectId of Instructor
        const userId=req.user.id;
        const instructorDetails = await User.findById(userId,{
            accountType:"Instructor",
        });

        //TODO: Verify that userId and instructorDetils._id are same or different
       
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor Detail Not Found",
            })
        }

        //ended
        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details not found",
            })
        }

        //Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tags:tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        })

        //add the new course to the user schema of  instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                courses:newCourse._id}
            },
            {new:true});

        // TODO(HW):Update the Category Schema with new course
        await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error:error.message,
        })
    }
}

exports.getAllCourses = async (req,res) =>{
    try{
        //will change incrementally  
        const allCourses = await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReviews:true,
                                                studentsEnrolled:true,})
                                                .populate("instructor")
                                                .exec();
        if(!allCourses){
            return res.status(400).json({
                success:false,
                message:"Courses not Found",
            })
        }
        return res.status(200).json({
            success:true,
            data:allCourses,
            message:"All Courses fetched successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Cannot get all courses",
            error:error.message,
        })
    }
}

exports.getCourseDetails = async (req,res) =>{
    try{
        const {courseId}=req.body;
        const courseDetails = await Course.findById({_id:courseId})
                                             .populate({    //nested populate
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                }
                                             })
                                             .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"SubSection",
                                                },
                                             })
                                             .exec();
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            })
        }  
        return res.status(200).json({
            success:true,
            message:"Course Details fetched Successfully",
            data:courseDetails,
        }) 
        //many things in getCourseDetails had reference stored in it need to populate
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.editCourse = async (req,res)=>{
   try{
    const {courseId, courseName,courseDescription, whatYouWillLearn, price,category}= req.body;
    const thumbnail = req.files.thumbnailImage;
    if(!courseId || !courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail || !category){
        res.status(400).json({
            success:false,
            message:"Incomplete Details! Fill your detail fully",
            data:req.body
        })
    }

    const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
    const result=await Course.findById({_id:courseId})
    //             {
    //                 category:category,
    //                 courseName:courseName,
    //                 courseDescription:courseDescription,
    //                 instructor:instructorDetails._id,
    //                 whatYouWillLearn:whatYouWillLearn,
    //                 price:price,
    //                 thumbnail:thumbnailImage.secure_url,
    //             },
    //         {new:true}
    // )
            result.category=category;
            result.courseName=courseName;
            result.courseDescription=courseDescription;
            result.whatYouWillLearn=whatYouWillLearn;
            result.price=price;
            result.thumbnail=thumbnailImage.secure_url;

            await result.save();
    return res.status(200).json({
        success:true,
        message:"Successfully edited the course details",
        data:result
    })
   }catch(error){
    return res.status(400).json({
        success:false,
        message:"Bad Request"
    })
   }


}