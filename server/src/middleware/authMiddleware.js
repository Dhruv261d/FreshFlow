const jwt = require('jsonwebtoken');

// 1. Authenticate: Verify if the user is logged in
exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer <token>
    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user payload (id and role) to request
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// 2. Authorize: Check if the user's role is allowed for this route
exports.authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) { // Compare user role to allowed array
            return res.status(403).json({ message: "Access Forbidden: Insufficient Permissions" });
        }
        next();
    };
};