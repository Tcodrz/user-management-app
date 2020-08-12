const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Function that return the next ID for the input collection (['user', 'post', 'todo'])
const getNextId = require('./getNextId');

// REGISTER NEW USER
exports.register = async (req, res) => {
	try {
		const id = await getNextId('user');

		const newUser = new User({
			email: req.body.email,
			name: req.body.name,
			address: {
				city: req.body.address.city,
				zipcode: req.body.address.zipcode,
				street: req.body.address.street,
			},
			password: req.body.password,
			id: id,
		});
		const user = await newUser.save();
		if (!user) {
			return res
				.status(500)
				.send('Could not register new user, please try again later');
		}
		const token = jwt.sign(
			{ id: user._id, email: user.email },
			'super-secret-key'
		);
		res.status(201).json({
			user,
		});
	} catch (error) {
		return res.send(error);
	}
};

// LOGIN USER - user must login to create a new post
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(401).send('please provide email and password');
		}
		const user = await User.findOne({ email: email }).select('+password');

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).send('Incorrect email or password');
		}

		const token = jwt.sign(
			{ email: user.email, id: user._id },
			'super-secret-key'
		);
		user.password = undefined;
		res.set({ token }).status(200).json({
			user,
		});
	} catch (error) {
		res.send(error);
	}
};
