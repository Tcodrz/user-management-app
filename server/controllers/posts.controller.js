const Post = require('../models/post.model');
const User = require('../models/user.model');

// Function that return the next ID for the input collection (['user', 'post', 'todo'])
const getNextId = require('./getNextId');

// GET ALL POSTS
exports.getAll = async (req, res, next) => {
	try {
		const posts = await Post.find();
		if (!posts) {
			return res.status(500).send('Could not get posts, try again later');
		}
		return res.status(200).json({
			posts,
		});
	} catch (error) {
		res.send(error);
	}
};

// GET POST BY ID
exports.getById = async (req, res, next) => {
	try {
		const id = req.params.id;

		const post = await Post.findOne({ id: id });

		if (!post) {
			return res.status(404).send('No post with that id');
		}

		res.status(200).json({
			post,
		});
	} catch (error) {
		return res.send(error);
	}
};

// CREATE NEW POST
exports.createPost = async (req, res, next) => {
	try {
		const userid = req.params.userid;

		const user = await User.findOne({ id: userid });

		if (!user) {
			return res.send('No User Found, can not create post with no user');
		}

		const id = await getNextId('post');
		const newPost = new Post({
			userId: userid,
			id: id,
			title: req.body.title,
			body: req.body.body,
		});
		await newPost.save();
		res.status(201).json({
			newPost,
		});
	} catch (error) {
		return res.send(error);
	}
};

// UPDATE POST
exports.updatePost = async (req, res) => {
	const id = req.params.id;
};

exports.deleteAllUsersPosts = (req, res) => {
	try {
		const userid = req.params.userid;
		Post.find((err, posts) => {
			if (err) {
				return res.send(err);
			}
			posts.forEach(async (post) => {
				if (post.userId == userid) {
					await Post.findOneAndDelete({ id: post.id });
				}
			})
			res.status(204).send('Users Posts Deleted!')
		})
	} catch (error) {
		res.send(error)
	}
}

// DELETE POST
exports.deletePost = async (req, res) => {
	try {
		const id = req.params.id;

		await Post.findOneAndDelete({ id: id });

		res.status(204).send('Deleted Successfully');
	} catch (error) {
		res.send(error);
	}
};
