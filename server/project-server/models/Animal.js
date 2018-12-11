const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const User = require ('./User');


const animalSchema = new Schema({
  filePath: { type: String, required:false},
  type : { type: String, required: false},
  gender : { type: String, required: false },
  name : { type: String, required: false },
  color : { type: String, required:false },
	age : { type: Number, min: 0, max: 30 },
	size : { type: String, required: false },
	breed : { type: String, required: false},
  description : { type: String, required: false },
  location : {
    address : String,
    city : String
	},
	owner: { type: Schema.Types.ObjectId, ref: 'User'},
},
{
  timestamps: true,
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;