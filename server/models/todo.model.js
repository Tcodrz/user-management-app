const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
	{
		userId: Number,
		id: Number,
		title: { type: String, required: [true, 'title is required'] },
		completed: { type: Boolean, default: false },
	},
	{
		collection: 'todos',
	}
);

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
