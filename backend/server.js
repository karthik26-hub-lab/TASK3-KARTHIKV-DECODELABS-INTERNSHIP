// 1. Load environment variables first
require('dotenv').config();

// Import the database connection function
const connectDB = require('./config/db');

// Connect to the database
connectDB();

// 2. Import dependencies
const express = require('express');
const cors = require('cors');

// 3. Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Global Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse incoming JSON payloads

// 5. Import Routers
const destinationRoutes = require('./routes/destinations');

// 6. Mount Routers
app.use('/api/destinations', destinationRoutes);

// Health-check route
app.get('/api/health', (req, res) => {
  res.json({ status: "ok", message: "Travique API is running smoothly." });
});

// 7. Catch-All 404 Middleware (Must be at the bottom of routes)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found. Check your URL." });
});

// 8. Start the Server
app.listen(PORT, () => {
  console.log(`Travique backend is running on http://localhost:${PORT}`);
});