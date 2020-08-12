const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		id: { type: Number, unique: true },
		name: {
			type: String,
			required: [true, 'please provide your name'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'please provide your email'],
			validate: {
				validator: validator.isEmail,
				message: 'please provide a valid email',
			},
		},
		address: { type: Map, of: String },
	},
	{
		collection: 'users',
	}
);

// BEFORE SAVE HASH THE PASSWORD
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
