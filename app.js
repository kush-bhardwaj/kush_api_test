
const express = require('express')
const cors =require('cors')
const RegisterRouter = require('./src/router/RegisterRouter')
const TaskRouter = require('./src/router/TaskRouter')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/auth',RegisterRouter)
app.use('/api/v1/task',TaskRouter)
module.exports = app;