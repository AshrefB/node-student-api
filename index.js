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
app.use(express.json())

// ROUTES
app.get('/api/students', (req, res) => {
    res.status(200).json(students)
})

app.get('/api/students/:id', (req, res) => {
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).json({message: `Student with ${req.params.id} not found`})
    res.status(200).json(student)
})

app.post('/api/students', (req, res) => {
    let student = {
        id: students.length+1,
        name: req.body.name,
        age: req.body.age 
    }

    students.push(student)
    res.statusMessage = "Student created successfully"
    res.status(200).json(student)
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))