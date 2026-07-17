const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token
            token = req.headers.authorization.split(' ')[1];

            // Use the same fallback logic as your login route
            const secret = process.env.JWT_SECRET || 'secretkey';
            
            // Verify the token here, inside the function scope
            const decoded = jwt.verify(token, secret);

            // Locate user
            const userId = decoded.id || decoded._id || decoded.userId;
            req.user = await User.findById(userId).select('-password');
            
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