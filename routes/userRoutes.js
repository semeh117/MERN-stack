const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/', userController.getAllusers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.DeleteUser);

module.exports = router;