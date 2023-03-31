const express = require("express");
const router = express.Router();
const {isLoggedin} = require('../../validationMiddleware');
const User = require('../../models/user');
router.post("/product/:id/like",isLoggedin, async (req, res)=>{
   const {id} = req.params;
   // grab the logged in user
   const user = req.user;;
   const isLiked = user.wishList.includes(id);// if product already liked or not
   if(!isLiked){
    // updating the current user;
    req.user = await User.findByIdAndUpdate(req.user.id, {$addToSet: { wishList: id }}, {new:true});// monoose operator $addToSet will add element to an array if it is not present 
   }else{
    req.user = await User.findByIdAndUpdate(req.user.id, {$pull: { wishList: id }}, {new:true});// monoose operator $pull will remove element from an array if it is present 
    }
    console.log("Hello");
    res.send("Like it");
})
module.exports = router;