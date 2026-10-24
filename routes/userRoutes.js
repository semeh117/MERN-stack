const express = require('express');
const router = express.Router();
const {
    registerUser,loginUser,
    getUserProfile,getAllUsers
} = require('../controller/userController');
const {protect ,adminOnly} = require('../Middlaweres/authMiddleware');
const {updatePassword}=require('../controller/userController')
//Public authentification routes 
router.post('/register',registerUser);
router.post('/login',loginUser);

//Private profile route protected by JWT
router.get('/profile',protect,getUserProfile);

//Administartor-only route (Valid JWT + admin role)
router.get('/',protect ,adminOnly ,getAllUsers);

// Password updates require an authenticated user
router.put('/update-password', protect,updatePassword);

module.exports = router;
