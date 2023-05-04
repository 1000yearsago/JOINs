const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me1',
  host: 'localhost',
  database: 'api27',
  password: '1234',
  port: 5432,
})

const addStudent = (request, response) => {
    const { f_name, l_name, subject_id } = request.body
  
    pool.query('INSERT INTO students (f_name, l_name, subject_id) VALUES ($1, $2, $3) RETURNING *', [f_name, l_name, subject_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Student added with ID: ${results.rows[0].id}`)
    })
  }

const addTask = (request, response) => {
    const { task_id, subject, task } = request.body
  
    pool.query('INSERT INTO tasks (task_id, subject, task) VALUES ($1, $2, $3) RETURNING *', [task_id, subject, task], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Tasks added with ID: ${results.rows[0].id}`)
    })
}

const getTasks = (request, response) => {
    pool.query(`
      SELECT f_name, l_name, subject_id, subject, task
      FROM students 
      LEFT JOIN tasks ON subject_id = task_id `, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports = {
    addStudent,
    addTask,
    getTasks
}