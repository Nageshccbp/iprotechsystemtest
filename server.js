const express = require("express");
const mongoose = require("mongoose");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const TodoModel = require("./Todomodel")
const authuntication = require("./authuntication")
const app = express();
app.use(express.json());

//sql database connection and rest apis ////
const dbPath = path.join(__dirname, "seqal.db");

let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("server is running at local host");
    });
  } catch (error) {
    console.log(`DB Error ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

//connection of nosql databse like mongoose 

mongoose.connect('mongodb://localhost:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnection = mongoose.connection;
mongoConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoConnection.once('open', () => {
  console.log('Connected to MongoDB');
});


// ...

  
  // Create SQL table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL
    )
  `;
  
  sqlConnection.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('SQL table created');
  });
  
  // CRUD RESTful API for SQL table
  app.get('/api/sql' ,authuntication, (req, res) => {
    const selectQuery = 'SELECT * FROM todos';
    sqlConnection.query(selectQuery, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.post('/api/sql',authuntication, (req, res) => {
    const { title, description } = req.body;
    const insertQuery = `INSERT INTO todos (title, description) VALUES (#, #)`;
    const values = [title, description];
    sqlConnection.query(insertQuery, values, (err, result) => {
      if (err) throw err;
      res.json({ message: 'Record created successfully..' });
    });
  });
  
  app.put('/api/sql/:id',authuntication, (req, res) => {
    const recordId = req.params.id;
    const { title, description } = req.body;
    const updateQuery = `UPDATE todos SET title = #, description = # WHERE id = #`;
    const values = [title, description, recordId];
    sqlConnection.query(updateQuery, values, (err, result) => {
      if (err) throw err;
      res.json({ message: 'Record updated successfully...' });
    });
  });
  
  app.delete('/api/sql/:id',authuntication, (req, res) => {
    const recordId = req.params.id;
    const deleteQuery = `DELETE FROM todos WHERE id = #`;
    sqlConnection.query(deleteQuery, recordId, (err, result) => {
      if (err) throw err;
      res.json({ message: 'Todo deleted successfully....' });
    });
  });
  
  // // CRUD RESTful API for SQL table

  app.get('/api/nosql', (req, res) => {
    TodoModel.find({}, (err, todos) => {
      if (err) throw err;
      res.json(todos);
    });
  });
  
  app.post('/api/nosql', (req, res) => {
    const { title, description } = req.body;
    const newTodo = new TodoModel({ title, description });
    newTodo.save((err, todo) => {
      if (err) throw err;
      res.json({ message: 'Record created successfully..', todo });
    });
  });
  
  app.put('/api/nosql/:id', (req, res) => {
    const documentId = req.params.id;
    const { title, description } = req.body;
    TodoModel.findByIdAndUpdate(documentId, { title, description }, { new: true }, (err, todo) => {
      if (err) throw err;
      res.json({ message: 'Record updated successfully..', todo });
    });
});

app.delete('/api/nosql/:id', (req, res) => {
  const documentId = req.params.id;
  TodoModel.findByIdAndDelete(documentId, (err) => {
    if (err) throw err
    res.send('Todo deleted successfully...') 
  })
});    