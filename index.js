const express = require('express')
const students_router = require('./routes/students')

const app = express()
const port = process.env.PORT || 3000

// MIDLLEWARES
app.use(express.json())

// ROUTES
app.use('/api/students', students_router)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))