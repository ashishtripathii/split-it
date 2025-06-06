const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


// Routes
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const generalRoutes = require('./routes/generalRoutes');
app.use('/api/general', generalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);


// Base route for testing
app.get('/', (req, res) => {
  console.log('GET / called');
  res.send('API is running...');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
