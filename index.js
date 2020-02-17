const express = require('express')
const morgan = require('morgan')
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const logDebugger = require('debug')('app:log')
const students_router = require('./routes/students')
const logger = require('./middlewares/logger')
const auth = require('./middlewares/auth')

const app = express()
const port = process.env.PORT || 3000

startupDebugger("Application started...")
console.log(`APP NAME: ${config.get('name')}`)

// MIDLLEWARES
app.use(express.json())
app.use(logger)
app.use(auth)

if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
    logDebugger('Morgan is enable.')
}

// ROUTES
app.use('/api/students', students_router)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))