const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const validateEvent = require("../validation/validaion");
const router = express.Router(); 


// Register route
router.post('/register', validateEvent, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashPassword, email });
        await newUser.save();
        res.status(201).json({ message: "User created" }); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" }); 
    }
});


// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
     
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token }); 

   } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    };
});

// router.delete('/:id', async (req, res) => {
//     const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(204).send(); 
// });

module.exports = router;
