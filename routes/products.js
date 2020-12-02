var express = require("express");
var router = express.Router();
var Booking = require("../models/product");
var User = require("../models/users");
var newBookings = require("../models/newBookings");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Booking.find();
  console.log(req.session.user);
  res.render("products/list", { title: "Bookings In DB", products: products });
});
router.get("/add", async function (req, res, next) {
  res.render("products/add");
});
router.post("/add", async function (req, res, next) {
  let booking = new Booking(req.body);
  await booking.save();
  if (User) res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let booking = await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
router.get("/cart/:id", async function (req, res, next) {
  let booking = await Booking.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(booking);
  res.cookie("cart", cart);
  res.redirect("/products");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/checkout", async function (req, res, next) {
  let newbooking = await newBookings(req.body);
  res.render("products/checkout", { newbooking });
});
router.post("/checkout", async function (req, res, next) {
  let newbooking = new newBookings(req.body);
  newbooking.tourDestination = req.body.tourDestination;
  newbooking.id = req.body.id;
  newbooking.tourStart = req.body.tourStart;
  newbooking.noOfDays = req.body.noOfDays;
  newbooking.charges = req.body.charges;
  await newbooking.save();
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let booking = await Booking.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
router.get("/edit/:id", async function (req, res, next) {
  let booking = await Booking.findById(req.params.id);
  res.render("products/edit", { booking });
});
router.post("/edit/:id", async function (req, res, next) {
  let booking = await Booking.findById(req.params.id);
  booking.name = req.body.name;
  booking.id = req.body.id;
  booking.noOfSeats = req.body.noOfSeats;
  booking.tourDestination = req.body.tourDestination;
  booking.tourDate = req.body.tourDate;
  booking.charges = req.body.charges;
  await booking.save();
  res.redirect("/products");
});

module.exports = router;
