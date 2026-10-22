const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// In-memory coffee data storage (No MongoDB needed!)
let coffees = [
  { _id: '1', name: 'Espresso', description: 'Strong and bold single shot', votes: 5 },
  { _id: '2', name: 'Cappuccino', description: 'Espresso with steamed milk and foam', votes: 8 },
  { _id: '3', name: 'Latte', description: 'Smooth espresso with plenty of milk', votes: 3 }
];

// 1. GET: Fetch all coffee items
app.get('/api/coffee', (req, res) => {
  res.json(coffees);
});

// 2. GET: Fetch leaderboard (sorted by votes descending)
app.get('/api/coffee/leaderboard', (req, res) => {
  const sorted = [...coffees].sort((a, b) => b.votes - a.votes).slice(0, 5);
  res.json(sorted);
});

// 3. POST: Vote for a coffee
app.post('/api/coffee/:id/vote', (req, res) => {
  const coffee = coffees.find(c => c._id === req.params.id);
  if (!coffee) return res.status(404).json({ error: 'Coffee not found' });
  
  coffee.votes += 1;
  res.json(coffee);
});

app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT} (No DB required)`);
});