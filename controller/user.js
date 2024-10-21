const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Get a user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        return res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).send("User deleted successfully");
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};
