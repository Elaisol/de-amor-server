const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username : { type: String, required: true},
	password : { type : String, required : true, minlength : 8},
	
	avatarUrl: { type: String, default: 'images/default-avatar.png' },
},
{
	timestamps: { 
		createdAt: "created_at",
		updatedAt: "updated_at"
	}
});

const User = mongoose.model('User', userSchema);
module.exports = User;