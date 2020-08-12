const User = require('../models/user.model');

// GET ALL USERS
exports.getAll = async (req, res, next) => {
	const users = await User.find();
	if (!users) {
		return res.status(500).send('Could Not Complete Request, Try Again Later');
	}
	res.status(200).json({
		users,
	});
};

// GET USER BY ID
exports.getById = async (req, res, next) => {
	try {
		const id = req.params.id;

		const user = await User.findOne({ id: id });

		if (!user) {
			return res.status(404).send('No user found with that id');
		}

		res.status(200).json({ user });
	} catch (error) {
		res.send(error);
	}
};

// UPDATE USER DETAILS
exports.updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;

		const user = await User.findOneAndUpdate({ id: id }, req.body);

		if (!user) {
			return res.status(500).send('Could not update user');
		}

		await user.save();

		res.status(200).json({
			user,
		});
	} catch (error) {
		res.send(error);
	}
};

// DELETE USER
exports.delete = async (req, res, next) => {
	try {
		const id = req.params.id;

		await User.findOneAndDelete({ id: id });

		res.status(204).send('User Deleted');
	} catch (error) {
		res.send(error);
	}
};
