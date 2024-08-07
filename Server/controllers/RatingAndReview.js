//TODO:Can Create a api route to fetch the ratings and reviews based on single course


const RatingAndReview = require("../models/RatingAndReview");

const Course = require("../models/Course");

//create Rating
exports.createRating = async (req,res) =>{
    try{
        //get user id
        //fetchdata from req body
        //check whether user is enrolled in course or not
        //check if user had already created a review
        //review only once for one user
        //create rating and review
        //update course with this rating and review
        
        //attached in auth
        const userId=req.user.id;
        const {rating,review,courseId} = req.body;
        const courseDetails = await Course.findOne({_id:courseId,
                                                    studentsEnrolled:{$eleMatch: {$eq:userId}},
        });
        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course",
            })
        }
        const userAlreadyReviewed = await RatingAndReview.findOne({
                                            user:userId,
                                            course:courseId,
                                            })
        if(userAlreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"You can review a course only once"
            })
        }
     
        const ratingReview = await RatingAndReview.create({
                                rating,review,
                                course:courseId,
                                user:userId,
        })

        //updating in course
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                        {
                            $push:{
                                ratingAndReviews:ratingReview._id,
                            }
                        },{new:true});
        
        return res.status(200).json({
            success:true,
            message:"Rating and Review creatd Successfully",
            ratingReview,
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

//avg Rating
exports.getAverageRating = async (req,res)=>{
    try{
        const courseId = req.body.courseId;

        //taking all course review of particular course with course id
        
        //mongoose aggregate function
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    //converting courseId which is in string to mongo objectid
                    course:new  mongoose.Types.ObjectId(courseId),
            },
            },{
                //grouping
                $group:{
                    _id:null,
                    //assigning average rating
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        //to group them
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:"Average Rating is 0, No Ratings given till now",
                averageRating:0,
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllRating = async (req,res) =>{
    try{
        const allReviews = await RatingAndReview.findOne({})
                                                .sort({rating:"desc"})
                                                //selected field populate
                                                .populate({
                                                    path:"user",
                                                    //only give this fields only
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                })
                                                .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//TODO:Can Create a api route to fetch the ratings and reviews based on single course