const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
  imageUrl: { type: String, required: true },
  type: { type: String, required: true },
  gender: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  age: { type: String, required: true },
  size: { type: String, required: true },
  breed: { type: String, required: true },
  description: { type: String, required: true },
  contacts: { type: String, required: true },
  location: {
    address: String,
    city: String,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
