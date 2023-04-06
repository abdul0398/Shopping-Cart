const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const {registerForm,registerFormSubmit,loginForm,loginFormSubmit,logout} = require('../controllers/auth');
router.get("/register",registerForm);

router.post("/register",registerFormSubmit);

router.get("/login", loginForm);

router.post('/login', passport.authenticate('local',{ failureRedirect: '/login', failureFlash: true }), loginFormSubmit);

router.get('/logout', logout);
module.exports = router;
