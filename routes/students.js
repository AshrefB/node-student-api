const express = require('express')
const joi = require('joi')
const router = express.Router()

// DATA
var students = [
    {id: 1, name: 'Student 1', age: 20},
    {id: 2, name: 'Student 2', age: 21},
    {id: 3, name: 'Student 3', age: 22},
]

const validation_schema = {
    name: joi.string().min(3).max(20).required(),
    age: joi.number().min(6).required()
}

router.get('/', (req, res) => {
    res.status(200).json(students)
})

router.get('/:id', (req, res) => {
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).json({message: `Student with ${req.params.id} not found`})
    res.status(200).json(student)
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    let student = students.find(s => s.id === parseInt(req.params.id))
    if(!student)
        return res.status(404).json({message: `Student with ${req.params.id} not found`})
    
    students = students.filter(s => s !== student)
    res.statusMessage = "Student deleted successfully"
    res.status(200).json(students)
})

module.exports = router