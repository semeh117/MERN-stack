const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const User = require('../models/userModels');

// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );
};

// POST /api/users/register (Registration)
const registerUser = async (req, res) => {
    try {
        const { name, email, password, age, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email, and password are required'
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({
                message: 'Email is already registered'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(500).json({
            message: err.message
        });
    }
};

// POST /api/users/login (Authentication)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
// PUT /api/users/update-password (Protected password update)
const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: 'Current password and new password are required'
            });
        }

        // Find the authenticated user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Verify the current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Current password is incorrect'
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update and save the new password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: 'Password updated successfully'
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: err.message
            });
        }

        return res.status(500).json({
            message: err.message
        });
    }
};


// GET /api/users/profile (Protected profile)
const getUserProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET /api/users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    updatePassword
};