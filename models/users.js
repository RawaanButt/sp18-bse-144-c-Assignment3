var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  Username: String,
  password: String,
});

const User = mongoose.model("users", userSchema);
module.exports = User;
