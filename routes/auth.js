const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
router.get("/register", async (req, res) => {
  res.render("auth/register");
});
router.post("/register", async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const user = new User({username, email});
    await User.register(user, password);
      req.login(user, function(err) {
        if (err) {
           return next(err); 
        }
        req.flash("success", `Wecome ${req.user.username}`);
        return res.redirect('/products');
      });
  } catch (error) {
    req.flash("error", error.message);
    res.render('auth/register');
  }
    
});

router.get("/login", async (req, res) => {
  res.render("auth/login");
});
router.post('/login', passport.authenticate('local',{ failureRedirect: '/login', failureFlash: true }),function(req, res) {
    req.flash('success', `Welcome back ${req.user.username}`);
    res.redirect('/products');
});
router.get('/logout', function(req, res) {
        req.logout(function(err) {
            req.flash("error", "we miss you! good bye.");
        if (err) { return next(err); }
        res.redirect('/products');
    });
  });
module.exports = router;
