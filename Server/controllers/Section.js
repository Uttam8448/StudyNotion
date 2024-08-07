const Section = require("../models/Section");
const Course = require("../models/Course");

//HW:Use Populate to replace both sections and subsection both in the updatedCourseDetails
exports.createSection = async (req,res) => {
    try{
        //data fetch
        //data validation
        //create section
        //update course with section ObjectId
        // return response

        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            res.status(400).json({
                success:false,
                message:"Missing Properties",
            })
        }

        //create a section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                                            { $push:{
                                                                courseContent:newSection._id,
                                                            }},
                                                            {new:true}).populate({
                                                                path:"courseContent",
                                                                populate: {
                                                                    path:"SubSection",
                                                                }
                                                            })
                                                            .exec();
        

        //HW:Use Populate to replace both sections and subsection both in the updatedCourseDetails
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updatedCourseDetails,
        })                                                            
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        })
    }
}

exports.updateSection = async (req,res) =>{
    try{
        //data input
        //data validation
        //section change does not mean that we need to update anything in course model
        //return res
        const {sectionName,sectionId} = req.body;

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        })
    }
};

// TODO:do we need to delete in Course section array (In testing Phase)
exports.deleteSection = async (req,res) => {
    try{
        //get id - we are sending id in params
        //use findbyIDandDelete
        //return response
        const {sectionId} = req.params;
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"Section Not Found!!",
            })
        }
        await Section.findByIdAndDelete(sectionId);

        // TODO:do we need to delete in Course section array (In testing Phase)
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete Sub Section, please try again",
            error:error.message,
        })
    }
}