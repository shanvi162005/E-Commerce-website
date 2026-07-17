const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const secret = process.env.JWT_SECRET || 'secretkey';
            const decoded = jwt.verify(token, secret);
            console.log("=== TOKEN PAYLOAD DECODED ===", decoded);

            // Check every possible variation of user ID inside the token payload
            const userId = decoded.id || decoded._id || decoded.userId;

            if (!userId) {
                console.log("❌ Error: No user ID key found inside the decrypted token payload.");
                return res.status(401).json({ error: 'Not authorized, invalid token payload structure' });
            }

            req.user = await User.findById(userId).select('-password');
            
            if (!req.user) {
                console.log(`❌ Error: Token is valid for ID ${userId}, but no user matches it in MongoDB.`);
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }
            next();
        } catch (error) {
            console.error("❌ JWT Verification Error:", error.message);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token found' });
    }
};

module.exports = { protect };