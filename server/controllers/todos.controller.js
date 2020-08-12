const Todo = require('../models/todo.model');

// Function that return the next ID for the input collection (['user', 'post', 'todo'])
const getNextId = require('./getNextId');

exports.getAll = async (req, res) => {
	try {
		const todos = await Todo.find();

		if (!todos) {
			return res.status(500).send('Could not get Todos, try again later');
		}
		res.status(200).json({ todos });
	} catch (error) {
		res.send(error);
	}
};

exports.getById = async (req, res) => {
	try {
		const id = req.params.id;

		const todo = await Todo.findOne({ id: id });

		if (!todo) {
			return res.status(404).send('No Todo Found with that id');
		}
		res.status(200).json({ todo });
	} catch (error) {
		res.send(error);
	}
};

exports.createTodo = async (req, res) => {
	try {
		const userid = req.params.userid;

		const id = await getNextId('todo');

		const todo = new Todo({
			userId: userid,
			id: id,
			title: req.body.title,
		});

		const newTodo = await todo.save();

		res.status(201).json({ newTodo });
	} catch (error) {
		res.send(error);
	}
};
exports.deleteTodo = async (req, res) => {
	try {
		const id = req.params.id;
		await Todo.findOneAndDelete({ id: id });

		res.status(204).send('Deleted Successfully');
	} catch (error) {
		res.send(error);
	}
};

exports.deleteAllUserTodos = async (req, res) => {
	try {
		const userid = req.params.userid;
		Todo.find((err, todos) => {
			if (err) {
				console.log(err);
			}
			todos.forEach(async (todo) => {
				if (todo.userId == userid) {
					await Todo.findOneAndDelete({ id: todo.id });
				}
			})
			res.status(204).send('Todos Deleted');
		})

	} catch (error) {
		res.send(error);
	}
}

exports.markCompleted = async (req, res) => {
	try {
		const id = req.params.id;

		const todo = await Todo.findOneAndUpdate(
			{ id: id },
			{ completed: true },
			{ new: true }
		);

		res.status(200).json({ todo });
	} catch (error) {
		res.send(error);
	}
};
