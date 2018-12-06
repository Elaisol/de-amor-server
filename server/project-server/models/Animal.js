const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const User = require ('./User');


const animalSchema = new Schema({
  species : { type: String, required: true},
  sexo : { type: String, required: true },
  name : { type: String, required: true },
  color : { type: String, required:true },
	age : { type: Number, min: 0, max: 30 },
	porte : { type: String, required: true },
	raça : { type: String, required: true},
  description : { type: String, required: true },
  avatarUrl : { type: String, default: 'images/default-avatar.png' },
  location : {
    address : String,
    city : String
	},
	user: { type: Schema.Types.ObjectId, ref: 'User'},
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;