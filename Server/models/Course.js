const mongoose=require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        require:true
    },
    courseDescription:{
        type:String
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    //section
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews",
        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    tags:[
        {type:String}
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }],
    instructions: { 
		type: [String],
	},
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
})

module.exports=mongoose.model("Course",courseSchema);