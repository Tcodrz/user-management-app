const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/users').get(userController.getAll);

router
	.route('/users/:id')
	.get(userController.getById)
	.put(userController.updateUser)
	.delete(userController.delete);

module.exports = router;
