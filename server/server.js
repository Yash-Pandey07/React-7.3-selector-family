const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors()); // This will allow all origins by default

// Sample todo data
const todos = {
  1: { id: 1, title: 'Learn React', description: 'Go through React documentation and create small projects', completed: false },
  2: { id: 2, title: 'Learn Recoil', description: 'Learn how to use Recoil for state management in React', completed: false },
  3: { id: 3, title: 'Build a Project', description: 'Build a full-stack project using React and Node.js', completed: true }
};

// API endpoint to fetch todo by id
app.get('/todo', (req, res) => {
  const { id } = req.query;
  const todo = todos[id];

  if (todo) {
    res.json({ todo });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
