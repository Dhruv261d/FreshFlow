const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware')

// Route only accessible to Farmers
router.post('/list-harvest', authenticate, authorize(['FARMER']), (req, res) => {
    res.json({ message: "Farmer access granted" });
});

// Route only accessible to Drivers
router.get('/upcoming-shipments', authenticate, authorize(['DRIVER']), (req, res) => {
    res.json({ message: "Driver access granted" });
});

// Route accessible to Admin only
router.get('/fleet-map', authenticate, authorize(['ADMIN']), (req, res) => {
    res.json({ message: "Admin God View access granted" });
});

module.exports = router;