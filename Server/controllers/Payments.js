//config me likhte  hai configuration woh likha hai confih/razorpay me
const mongoose=require("mongoose");
//razorpay instance
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");


//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req,res)=>{
    //get courseId and userId
    //Validation
    //valid courseId
    //valid courseDetails
    //user already pay for the same course
    //order create
    //return response

    //req.user.id is wajah se kyuki hamne already store kiya hai when authenticating

    try{
        const {course_id} = req.body;
        const userId = req.user.id;
        //validation
        //valid courseId
        if(!course_id){
            return res.json({
                success:false,
                message:"Please provide with valid course Id to purchase ",
            })
        };
        let course;
        course = await Course.findById(course_id);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Could not find the course",
            })
        }
        //user already paid or not?
        //converted the string UerId into mongoose Object Id
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled",
            })
        }

        //order create
        // const amount = course.price;
        // const currency = "INR";
        //creating options object for payment
        
        // const options = {
        //     amount:amount*100,
        //     currency,
        //     receipt:Math.random(Date.now()).toString(),
        //     notes:{
        //         courseId:course_id,
        //         userId,
        //     }
        // }
        try{
            //initiate the payment using razorpay
            // const paymentResponse = await instance.orders.create(options);
            // console.log(paymentResponse);
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
            })

        }catch(error){
            console.log(error);
            res.json({
                success:false,
                message:"Could not initiate order",
            })
        }
    }catch(error){

    }
}

//verify signature of Razorpay and Server

exports.verifySignature = async(req,res)=>{
    // const webhookSecret = "12345678";
    // //razorpay passes the signature in the below key
    // const signature = req.headers["x-razorpay-signature"];
    
    //getting hmac object
    //2 input needed function and secret key
    // const shaSum = crypto.createHmac("sha256",webhookSecret);
    // //whenever when you  get string from hashing it is called as digest
    // shaSum.update(JSON.stringify(req.body));
    //digest generally in hexadecimal format
    // const digest = shaSum.digest("hex");
    //thus webhook is converted into digest

    // if(signature===digest){
    //     console.log("Payment is Authorised!");
    //     const {courseId,userId} = req.body.payload.payment.entity.notes;
    //     try{
    //         //fullfil the action

    //         //find the course and enroll him in the course
    //         const enrolledCourse = await Course.findOneAndUpdate(
    //             {_id:courseId},
    //             {$push:{studentsEnrolled}},
    //             {new:true},
    //         )
    //         if(!enrolledCourse){
    //             return res.status(500).json({
    //                 success:false,
    //                 message:"Course Not Found",
    //             })
    //         }
    //         //find the student and add the course to their list enrolled course
    //         const enrolledStudent = await User.findOneAndUpdate(
    //             {_id:userId},
    //             {$push:{courses:courseId}},
    //             {new:true}
    //         )
    //         console.log(enrolledStudent);
            
    //         //Sending mail
    //         const emailResponse = await mailSender(
    //             enrolledStudent.email,
    //             "Congratulations!! You are onboarded into new codeWay's course"
    //         )
    //         console.log(emailResponse);
    //         return res.status(200).json({
    //             success:true,
    //             message:"Signature Verified and Course added",
    //         })
    //     }   
    //     catch(error){
    //         console.log(error);
    //         return res.status(500).json({
    //             success:false,
    //             message:error.message,
    //         })
    //     }     
    
    // }
    // else{
    //     return res.status(400).json({
    //         success:false,
    //         message:"Invalid Request!!",
    //     })
    // }


    //Enroll course logic
    // try{
    // const {courseId,userId} = req.body;
    // const enrolledCourse = await Course.findOneAndUpdate(
    //     {_id:courseId},
    //     {$push:{studentsEnrolled}},
    //     {new:true},
    // )
    // if(!enrolledCourse){
    //         return res.status(500).json({
    //             success:false,
    //             message:"Course Not Found",
    //         })
    //     }
    //     //find the student and add the course to their list enrolled course
    //     const enrolledStudent = await User.findOneAndUpdate(
    //         {_id:userId},
    //         {$push:{courses:courseId}},
    //         {new:true}
    //     )
    //     console.log(enrolledStudent);
        
    //     //Sending mail
    //     const emailResponse = await mailSender(
    //         enrolledStudent.email,
    //         "Congratulations!! You are onboarded into new codeWay's course"
    //     )
    //     console.log(emailResponse);
    //     return res.status(200).json({
    //         success:true,
    //         message:"Signature Verified and Course added",
    //     })
    // }   
    // catch(error){
    //     console.log(error);
    //     return res.status(500).json({
    //         success:false,
    //         message:error.message,
    //     })

    // }
}

//yha pr request body nhi hogi kyuki frontend se api hit nhi hui hai balki api webHooks se hit hui hai
//thus info such as userId courseId we will get it from the notes passed to razorpay in options

exports.enrollCourse = async(req,res)=>{
    try{
        const {courseId,userId} = req.body;
        if(!courseId){
            return res.json({
                success:false,
                message:"Please provide with valid course Id to purchase ",
            })
        };
        let course;
        course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Could not find the course",
            })
        }
        //user already paid or not?
        //converted the string UerId into mongoose Object Id
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is already enrolled",
            })
        }

        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:uid}},
            {new:true},
        )
        if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course Not Found",
                })
        }
        //find the student and add the course to their list enrolled course
        const courseid = new mongoose.Types.ObjectId(courseId);

        const enrolledStudent = await User.findOneAndUpdate(
            {_id:userId},
            {$push:{courses:courseid}},
            {new:true}
        )
            
            //Sending mail
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations!! You are onboarded into new codeWay's course"
            )
            return res.status(200).json({
                success:true,
                message:"Course added",
                data:enrolledStudent,
            })
        }   
        catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
            })
    
        }
}