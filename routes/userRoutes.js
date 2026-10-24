const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/', userController.getUsers);
router.get('/:id', userController.getUsersById);
router.post('/', userController.createUser);
router.delete('/:id', userController.DeleteUser);

module.exports = router;