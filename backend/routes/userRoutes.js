const express = require('express');
const router = express.Router();
const { Login, Register, getUserById } = require('../controllers/authController');

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/:id').get(getUserById);



module.exports = router;
