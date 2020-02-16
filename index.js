const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// DATA
var students = [
    {id: 1, name: 'Student 1', age: 20},
    {id: 2, name: 'Student 2', age: 21},
    {id: 3, name: 'Student 3', age: 22},
]

// MIDLLEWARES

// ROUTES
app.get('/api/students', (req, res) => {
    res.status(200).json(students)
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))