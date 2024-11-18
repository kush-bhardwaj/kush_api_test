
const express = require('express')
const cors =require('cors')
const InsertRouter = require('./src/router/InserRouter')
const EmployeeRouter = require('./src/router/EmployeeRouter')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/user',InsertRouter)
app.use('/api/v1/employee',EmployeeRouter)
module.exports = app;