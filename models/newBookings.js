var mongoose = require("mongoose");
var bookingSchema = mongoose.Schema({
  tourDestination: String,
  id: String,
  tourStart: Date,
  noOfDays: String,
  charges: String,
});
const newBookings = mongoose.model("newBookings", bookingSchema);
module.exports = newBookings;
