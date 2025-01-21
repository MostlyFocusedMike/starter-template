const express = require('express');
const db = require('./db/my-models');
const app = express();

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/test', async (req, res) => {
  const people = await db.Person.findAll();
  console.log('people[0]:', people[0].test());
  res.json({
    message: 'Test route is working successfully',
    people,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: err.message
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});