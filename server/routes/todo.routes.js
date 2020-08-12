const router = require('express').Router();
const todoController = require('../controllers/todos.controller');

router.route('/todo').get(todoController.getAll);

router.route('/todo/:userid').post(todoController.createTodo);

router
	.route('/todo/:id')
	.get(todoController.getById)
	.put(todoController.markCompleted)
	.delete(todoController.deleteTodo);

// ROUTE FOR REMOVING ALL USER'S TODO'S
router.route('/todo/remove/:userid').delete(todoController.deleteAllUserTodos);

module.exports = router;
