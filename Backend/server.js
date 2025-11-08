// server/server.js
require('dotenv').config();
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
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('Business Card Templates API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));