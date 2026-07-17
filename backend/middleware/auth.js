const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if the header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the actual token string
            token = req.headers.authorization.split(' ')[1];

            // Verify using the absolute fallback 'secretkey' if process.env.JWT_SECRET isn't loaded
            const secret = process.env.JWT_SECRET || 'secretkey';
            const decoded = jwt.verify(token, secret);

            // Find the user in the database (checking both standard id variants)
            const targetId = decoded.id || decoded._id;
            req.user = await User.findById(targetId).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }
            next();
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token found' });
    }
};

module.exports = { protect };