/* THIS SCRIPT GETS ALL RELEVANT DATA FROM API AND SAVES IT TO APPROPREATE DATABASE COLLECTION */

const axios = require('axios');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// POSTS SCHEMA
const PostSchema = new Schema(
	{
		userId: Number,
		id: Number,
		title: String,
		body: String,
	},
	{
		collection: 'posts',
	}
);
// TODO SCHEMA
const TodoSchema = new Schema(
	{
		userId: Number,
		id: Number,
		title: String,
		completed: Boolean,
	},
	{
		collection: 'todos',
	}
);
// USER SCHEMA
const UserSchema = new Schema(
	{
		id: Number,
		name: {
			type: String,
		},
		username: String,
		email: String,
		address: {
			type: Map,
			of: String,
		},
	},
	{
		collection: 'users',
	}
);

// DECLARE MONGOOSE MODELS

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);
const Post = mongoose.model('Post', PostSchema);

// MONGOOSE CONNECTION
mongoose
	.connect('mongodb://localhost:27017/final-projectDB', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.log('Connected to MongoDB');
		// INVOKE ONCE FOR EACH MODEL
		await getFromApiAndSave(
			'https://jsonplaceholder.typicode.com',
			'posts',
			Post
		);
		await getFromApiAndSave(
			'https://jsonplaceholder.typicode.com',
			'todos',
			Todo
		);
		await getUsersFromApi(
			'https://jsonplaceholder.typicode.com',
			'users',
			User
		);
		console.log('MongoDB Populated with Data');
		mongoose
			.disconnect()
			.then(() => {
				console.log('MongoDB Disconnected');
			})
			.catch((error) => console.log(error));
	})
	.catch((err) => {
		console.log(err);
	});

// GET DATA FROM API AND SAVE TO DB
const getFromApiAndSave = (url, type, model) => {
	return new Promise(async (resolve) => {
		const response = await axios.default.get(`${url}/${type}`);
		const data = response.data;

		data.forEach(async (el) => {
			let currentElement = new model(el);
			await currentElement.save();
		});

		resolve();
	});
};

const getUsersFromApi = (url) => {
	return new Promise(async (resolve) => {
		try {
			const response = await axios.default.get(`${url}/users`);
			const users = response.data;

			users.forEach(async (user) => {
				const currentUser = new User({
					name: user.name,
					email: user.email,
					id: user.id,
					address: {
						city: user.address.city,
						street: user.address.street,
						zipcode: user.address.zipcode,
					},
				});
				await currentUser.save();
				resolve();
			});
		} catch (error) {
			console.log(error.stack);
		}
	});
};
