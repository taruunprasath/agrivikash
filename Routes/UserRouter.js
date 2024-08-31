const UserController = require('../Controllers/UserController');
const express = require('express');
const router = express.Router();

router.post('/signin', UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;