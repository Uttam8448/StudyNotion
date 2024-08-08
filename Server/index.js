const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());

//to integrate backend and frontend
app.use(
    cors({
        origin : "https://study-notion-frontend-sepia.vercel.app",
        credentials:true,
    })
)

//for cloudinary
app.use(
    fileUpload({
        useTempFiles:true,
        trempFileDir:"/tmp",
    })
)

//cloudinary connecction
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.get("/",(req,res) => {
    return res.json({
        success:true,
        message:"Your Server is up & running",
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})