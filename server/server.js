const express = require('express');
const cors = require('cors');
const corsOptions = {
}
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors(corsOptions));   
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to F1Prono API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 