const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide unique username'],
    unique: [true, 'Username exists'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  email: {
    type: String,
    required: [true, 'Please provide unique email'],
    unique: [true, 'email already exists'],
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

module.exports = User = mongoose.model("User",UserSchema);
