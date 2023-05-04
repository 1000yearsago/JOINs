const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.json({ info: 'UKD TASKS' })
  });
app.post('/addstudent', db.addStudent)
app.post('/addtask', db.addTask)
app.get('/tasks', db.getTasks)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })