 //TODO: get top 10 selling course

const Category=require("../models/Category");

exports.createCategory = async (req,res) =>{
    try{
        const {name,description} = req.body;
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory",
            })
        }
        //create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        })

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllCategory handler function
exports.showAllCategory=async (req,res) =>{
    try{
        //make sure that every data coming contains name and description name:true
        const allCategory=await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All Category returned successfully",
            data:allCategory,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in finding all category!!"
        })
    }
}

exports.categoryPageDetails = async (req,res) => {
    try{

        const {categoryId} = req.body;
        const selectedCategory = await Category.findById({_id:categoryId})
                                .populate("course")
                                .exec();

        if(!selectedCategory){
            return res.status(404).json({success: false, message: "Category not found"});
        }

        if(selectedCategory.course.length === 0){

            return res.status(404).json({
                success:false,
                message:"Category Not Found",
            })
        }

        const selectedCourses = selectedCategory.course;
        //get courses for different categories
        // const differentCategories = await Category.find({
        //                                  //ne- not equal
        //                                 _id: {$ne: categoryId},
        //                                     })
        //                                 .populate("courses")
        //                                 .exec();
        //TODO: get top 10 selling course
        
        //return response
        return res.status(200).json({
            success:true,
            data:selectedCourses   
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in fetching Category Page Details"
        })
    }
}