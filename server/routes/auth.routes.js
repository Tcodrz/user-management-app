const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// REGISTER
router.route('/auth/register').post(authController.register);

// LOGIN
router.route('/auth/login').post(authController.login);

module.exports = router;
