const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

const items = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      imageUrl: '/images/gatsby.jpg',
    },
    // Add at least five items
  ];

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});