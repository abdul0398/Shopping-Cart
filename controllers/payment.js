const Razorpay = require("razorpay");
const User = require("../models/user");
const Order = require("../models/order");
const crypto = require("crypto");
const instance = new Razorpay({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET,
});
module.exports.createOrderId =  async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("cart"); // finding user
    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    const options = {
      amount: totalAmount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.send(order);
    //console.log(order);
}


module.exports.varifyPayment =  async (req, res) => {
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    const userId = req.user._id;
    const user = await User.findById(userId).populate("cart"); // finding user
    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    console.log("hello")
    const order = await Order.create({orderId:req.body.razorpay_order_id,amount:totalAmount, orderedProducts:[...req.user.cart]})
    user.orders.push(order);
  
    await order.save();
    user.cart.splice(0, user.cart.length);
    req.user = await user.save();  
    console.log("Hello");
    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEYID)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === req.body.razorpay_signature) {
      res.redirect("myorders");
    }
}


module.exports.myorderPage = async(req, res) => {
    const userid = req.user._id;
    const user = await User.findById(userid).populate({
        path: 'orders',
        populate: {
            path: 'orderedProducts'
        }
    });
    res.render('myorder',{orders:user.orders});
};