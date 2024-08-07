// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature, enrollCourse } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
// router.post("/capturePayment", auth, isStudent, capturePayment)
// router.post("/verifySignature", verifySignature)


router.post("/enrollCourse",auth,isStudent,enrollCourse);

module.exports = router