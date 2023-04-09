const express = require("express");
const router = express.Router();
const { isLoggedin } = require("../validationMiddleware");
const {createOrderId, varifyPayment, myorderPage} = require('../controllers/payment');


router.get("/payment_gateway/razorpay", isLoggedin,createOrderId);

router.post("/api/payment/verify", isLoggedin, varifyPayment);

router.get('/order/myorders',isLoggedin,myorderPage);



module.exports = router;
