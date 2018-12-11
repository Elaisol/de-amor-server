const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
  filePath: { type: String },
  species: { type: String, required: false },
  gender: { type: String, required: false },
  name: { type: String, required: false },
  color: { type: String, required: false },
  age: { type: Number },
  size: { type: String, required: false },
  breed: { type: String, required: false },
  description: { type: String, required: false },
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
