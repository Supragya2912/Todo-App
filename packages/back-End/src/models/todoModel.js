const mongoose = require('mongoose');

// Define the todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Todo model
const TodoModel = mongoose.model('Todo', todoSchema);

// Export the Todo model
module.exports = TodoModel;
