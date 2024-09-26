const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date,
    default: Date.now,
  },
});

const UserModal = mongoose.model("users", userSchema);

module.exports = UserModal;
