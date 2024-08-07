const Razorpay = require("razorpay");

exports.instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET,
})



/* 
razorpay instance creation
need options object containing 
(both should be in env file)
i.key_id
ii.secret key passed to razorpay for hitting backend api with this secret key (hashed format) in header.
*/