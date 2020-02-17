const express = require('express')
const morgan = require('morgan')
const config = require('config')
const dotenv = require('dotenv')
const students_router = require('./routes/students')
const logger = require('./middlewares/logger')
const auth = require('./middlewares/auth')

const app = express()
const port = process.env.PORT || 3000

console.log(`APP NAME: ${config.get('name')}`)

// MIDLLEWARES
app.use(express.json())
app.use(logger)
app.use(auth)

if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
}

// ROUTES
app.use('/api/students', students_router)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))