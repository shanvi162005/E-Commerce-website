const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (checks if user is logged in)
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header is sent and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (split "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user in database and attach it to the request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');
      
      return next(); // Continue to the next step
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token found' });
  }
};

// Middleware to check if the logged-in user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, continue!
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };