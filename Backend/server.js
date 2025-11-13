// server/server.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const templateRoutes = require('./routes/templateRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your React app
app.use(express.json()); // Body parser for JSON

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME || 'business_card_db',
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('Business Card Templates API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));