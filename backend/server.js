const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies

app.use('/api/auth', require('./routes/auth'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas! 🚀'))
  .catch(err => console.error('Database connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));