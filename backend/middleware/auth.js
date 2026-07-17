const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header split
            token = req.headers.authorization.split(' ')[1];

            // Verify token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

            // Find user and attach it to the request object
            req.user = await User.findById(decoded.id || decoded._id).select('-password');
            
            if (!req.user) {
                console.log("Auth Error: Token is valid but user no longer exists in DB");
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.log(" Auth Error: Token verification failed:", error.message);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log(" Auth Error: No authorization header / token provided");
        return res.status(401).json({ error: 'Not authorized, no token found' });
    }
};

module.exports = { protect };