const User = require('../models/user.model');
const Post = require('../models/post.model');
const Todo = require('../models/todo.model');

const getNextId = (model) => {
	return new Promise(async (resolve, reject) => {
		let collection = null;
		switch (model) {
			case 'user':
				collection = await User.find();
				break;
			case 'post':
				collection = await Post.find();
				break;
			case 'todo':
				collection = await Todo.find();
				break;
		}

		if (!collection) {
			reject('Could Not Get Data');
		}

		let id = 0;

		collection.forEach((el) => {
			if (el.id > id) {
				id = el.id;
			}
		});

		resolve(id + 1);
	});
};

module.exports = getNextId;
