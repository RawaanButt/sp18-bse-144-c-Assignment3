var mongoose = require("mongoose");
var productSchema = mongoose.Schema({
  tourDestination: String,
  id: String,
  noOfSeats: String,
  tourStart: Date,
  noOfDays: String,
  charges: String,
});

const Booking = mongoose.model("bookings", productSchema);
module.exports = Booking;
