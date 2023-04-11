const User = require("../models/user");
let prevUrl; // to get the previous url from which we are redirected to login for authentication
module.exports.registerForm = async (req, res) => {
  res.render("register");
};
module.exports.registerFormSubmit = async (req, res) => {
  try {
    const { username, name, password, role } = req.body;
    const user = new User({ username, name, role }); // role will tell if the registering user is buyer or seller
    await User.register(user, password);
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      req.flash(
        "Success",
        `Successfully created you account! Wecome ${req.user.name}`
      );
      return res.redirect("/products");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.render("register");
  }
};
module.exports.loginForm = async (req, res) => {
  prevUrl = req.session.returnUrl; // to get the previous url from which we are redirected to login for authentication
  res.render("login");
};
module.exports.loginFormSubmit = (req, res) => {
  req.flash("success", `Welcome back ${req.user.name}`);
  let prev = prevUrl; // storing the previous url
  prevUrl = undefined; // making the prev url
  if (prev != undefined && prev.endsWith("review")) {
    // need to take care review page differently
    prev = prev.substring(0, prev.length - 6); // removing review from url
    res.redirect(prev);
  } else if (prev != undefined && prev.indexOf("delete") == -1) {
    res.redirect(prev);
  } else {
    res.redirect("/products");
  }
};
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    req.flash("error", "we miss you! good bye.");
    if (err) {
      return next(err);
    }
    res.redirect("/products");
  });
};
