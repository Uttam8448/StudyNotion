
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary, deleteContentFromCloudinary} = require("../utils/imageUploader");


//HW:log updated section here, after adding populate query
exports.createSubSection= async (req,res)=>{
    //fetchData from req body
    //extract file/video
    //validation
    //upload video to cloudinary (gets secure url)
    //create a sub section
    //Update Section with this subsection id putting in the array of section containing subsection
    //return response
    try{
        const {sectionId,title,timeDuration,description} = req.body;

        const video = req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !description || !video ){
            return res.status(400).json({
                success:false,
                message:"All fields are required to create a subsection",
            })
        }

        //Uploading
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create a sub section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //updation Section with this sub Section ObjectId
        const updatedSection= await Section.findByIdAndUpdate({_id:sectionId},
                { $push:{SubSection:subSectionDetails._id}},
                {new:true}).populate({
                    path:"SubSection",
                }).exec();

        //HW:log updated section here, after adding populate query

        return res.status(200).json({
            success:true,
            message:"Subsection Created Successfully",
            data:updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

//HW:updateSubsection
exports.updateSubSection = async (req,res) =>{
    try{
        const {subSectionId,title,timeDuration,description} = req.body;
        const video = req.files.videoFile;

        if(!subSectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"Enter all details to update subSection"
            })
        }
        const fetchSubSection=SubSection.findById({_id:id});
        fetchSubSection.title=title;
        fetchSubSection.timeDuration=timeDuration;
        fetchSubSection.description=description
        
        const updatedContent=await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME    
        ) 
        fetchSubSection.videoUrl=updatedContent.secure_url;
        await fetchSubSection.save();
        return res.status(200).json({
            success:true,
            message:"SubSection Updated!!",
            data:fetchSubSection
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message,

        })
    }
}
//HW:delete SubSection
exports.deleteSubSection = async (res,req) => {
    try{
        const {subSectionId,sectionId}=req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSection: subSectionId,
              },
            },
            {new:true}
          )
        const subSectionDetails = await SubSection.findByIdAndDelete({_id:subSectionId});
        return res.status(200).json({
            success:true,
            message:"subSection Deleted SuccessFully",
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't Delete the subSection"
        })
    }
}