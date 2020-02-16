const express = require('express')
const joi = require('joi')

const app = express()
const port = process.env.PORT || 3000

const validation_schema = {
    name: joi.string().min(3).max(20).required(),
    age: joi.number().min(6).required()
}

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
    const validation_result = joi.validate(req.body, validation_schema)
    if(validation_result.error)
        return res.status(400).json({message: validation_result.error.details[0].message})

    let student = {
        id: students.length+1,
        name: req.body.name,
        age: req.body.age 
    }

    students.push(student)
    res.statusMessage = "Student created successfully"
    res.status(200).json(student)
})

app.put('/api/students/:id', (req, res) => {
    let index = students.findIndex(s => s.id === parseInt(req.params.id))
    if(index == -1)
        return res.status(404).json({message: `Student with ${req.params.id} not found`})

    const validation_result = joi.validate(req.body, validation_schema)
    if(validation_result.error)
        return res.status(400).json({message: validation_result.error.details[0].message})

    students[index] = {
        id: req.params.id,
        name: req.body.name,
        age: req.body.age 
    }

    res.statusMessage = "Student updated successfully"
    res.status(200).json(students[index])
})

app.delete('/api/students/:id', (req, res) => {
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).json({message: `Student with ${req.params.id} not found`})
    
    students = students.filter(s => s !== student)
    res.statusMessage = "Student deleted successfully"
    res.status(200).json(students)
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))