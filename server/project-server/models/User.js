const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },

  avatarUrl: { type: String, default: 'images/default-avatar.png' },
}, {
  timestamps: true,

});

const User = mongoose.model('User', userSchema);
module.exports = User;
