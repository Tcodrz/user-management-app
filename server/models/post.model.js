const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		userId: Number,
		id: { type: Number, unique: true },
		title: {
			type: String,
			trim: true,
			required: [true, 'post must have a title'],
		},
		body: {
			type: String,
			required: true,
		},
	},
	{
		collection: 'posts',
	}
);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
