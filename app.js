require('dotenv').config();

const express = require('express');
const app = express();


// body parsing middleware 
app.use(express.json()); 

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false }
];

// GET All — Read
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

// POST New — Create
app.post('/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
});


// PATCH update - partial
app.patch("/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id)); //Array.find()
    if (!todo) return res.status(404).json({ message: "Todo not found"});
    Object.assign(todo, req.body); 
    res.status(200).json(todo);
})

// DELETE Remove
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id); //Array.filter() - non-destructive
    if (todos.length === initialLength) 
        return res.status(404).json({
            error: "Todo not found"});
            res.status(204).send; //Silent success
    });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});