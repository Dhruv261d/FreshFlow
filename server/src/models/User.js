const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ['FARMER', 'DRIVER', 'ADMIN'], required: true },
    kisanCreditScore: { type: Number, default: 0 }, // For Farmer role [cite: 41, 121]
    greenMiles: { type: Number, default: 0 }, // For Driver gamification [cite: 60, 275]
    isPro: { type: Boolean, default: false }, // For Pro Subscription [cite: 253, 255]
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);