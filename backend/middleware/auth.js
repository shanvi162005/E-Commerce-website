const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const secret = process.env.JWT_SECRET || 'secretkey';
            
            const decoded = jwt.verify(token, secret);
            req.user = await User.findById(decoded.id || decoded._id).select('-password');
            
            if (!req.user) return res.status(401).json({ error: 'User not found' });

            next();
        } catch (error) {
            console.log("CRITICAL ERROR: JWT Verification failed because:", error.message);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ error: 'No token provided' });
    }
};

module.exports = { protect };