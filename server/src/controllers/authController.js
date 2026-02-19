const User = require('../models/User');
const jwt = require('jsonwebtoken'); // 1. MAKE SURE THIS IS HERE

exports.login = async (req, res) => {
    const { phone, role } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role !== role) {
            return res.status(403).json({ message: `Access denied. You are a ${user.role}.` });
        }

        // 2. CHECK YOUR .env FILE FOR JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error("FATAL ERROR: JWT_SECRET is not defined in .env");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            user: { name: user.name, role: user.role } 
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err); // This prints the real error to your terminal
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.register = async (req, res) => {
    const { name, phone, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ message: "User already registered" });

        // Create new user
        user = new User({ name, phone, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};