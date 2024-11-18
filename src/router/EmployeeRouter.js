const { CreateEmployee, SingleEmployee, UpdateEmployee, DeleteEmployee, SearchEmployee } = require('../controller/EmployeController')

const express = require('express')
const EmployeeRouter= express.Router()
EmployeeRouter.post('/insertemp',CreateEmployee)
EmployeeRouter.get('/singleemployee/:id',SingleEmployee)
EmployeeRouter.put('/updateEmployee/:id',UpdateEmployee)
EmployeeRouter.delete('/deleteEmployee/:id',DeleteEmployee)
EmployeeRouter.get('/search',SearchEmployee)
module.exports = EmployeeRouter