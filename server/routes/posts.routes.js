const router = require('express').Router();
const postsController = require('../controllers/posts.controller');

router.route('/posts').get(postsController.getAll);

router
	.route('/posts/:id')
	.get(postsController.getById)
	.put(postsController.updatePost)
	.delete(postsController.deletePost);

// CREATE POST - ADD USER ID TO ROUTE
router.route('/posts/:userid').post(postsController.createPost)

// ROUTE FOR DELETING ALL USER'S POSTS
router.route('/posts/remove/:userid').delete(postsController.deleteAllUsersPosts);

module.exports = router;
