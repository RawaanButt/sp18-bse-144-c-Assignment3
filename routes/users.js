var express = require("express");
var router = express.Router();
var User = require("../models/users");

/* GET users listing. */
router.get("/signin", function (req, res, next) {
  res.render("users/signin");
});
router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/products");
});

router.post("/signin", async function (req, res, next) {
  let user = await User.findOne({
    Username: req.body.Username,
    password: req.body.password,
  });
  if (!user) return res.redirect("/users/signin");
  req.session.user = user;
  return res.redirect("/products");
});
router.get("/signup", async function (req, res, next) {
  res.render("users/signup");
});
router.post("/signup", async function (req, res, next) {
  let user = new User(req.body);
  user.Username = req.body.Username;
  user.password = req.body.password;
  await user.save();
  req.session.user = user;
  return res.redirect("/products");
});

module.exports = router;
