const express = require('express');
const cors = require('cors');
const path = require('path');
const items = require('./data/items'); // Import the items array from items.js

const app = express();

app.use(cors());

app.get('/api/items', (req, res) => {
    res.json(items);
});

app.get('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find((i) => i.id === itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
});

app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.use(express.static(path.join(__dirname, '../client')));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client', '404.html'));
});

// Set the port
const PORT = process.env.PORT || 3001;

// Start the server and save the instance
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Gracefully handle shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});