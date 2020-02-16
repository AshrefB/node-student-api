const express = require('express')
const students_router = require('./routes/students')
const logger = require('./middlewares/logger')
const auth = require('./middlewares/auth')

const app = express()
const port = process.env.PORT || 3000

// MIDLLEWARES
app.use(express.json())
app.use(logger)
app.use(auth)

// ROUTES
app.use('/api/students', students_router)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))