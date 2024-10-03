require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Client } = require('pg'); // Use Client for direct connections

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// PostgreSQL connection using the connection string
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Connection error', err.stack));

// Route to get all items
app.get('/api/items', async (req, res) => {
  try {
    console.log('GET /api/items called');
    const result = await client.query('SELECT * FROM books');
    res.json(result.rows); // Send the result rows as JSON
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to search items
app.get('/api/items/search', async (req, res) => {
  const searchQuery = req.query.q || '';
  try {
    if (searchQuery.trim() === '') {
      // Return all items if query is empty
      const result = await client.query('SELECT * FROM books');
      res.json(result.rows);
    } else {
      const result = await client.query(
        `SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1`,
        [`%${searchQuery}%`]
      );
      res.json(result.rows);
    }
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a single item by ID
app.get('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const result = await client.query('SELECT * FROM books WHERE id = $1', [itemId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the first matching row
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Serve static files
app.use(express.static(path.join(__dirname, '../client')));

// Fallback for any other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client', '404.html'));
});

const PORT = process.env.PORT || 3001;

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
