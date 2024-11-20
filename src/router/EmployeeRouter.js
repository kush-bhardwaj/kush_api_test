const { CreateEmployee, SingleEmployee, UpdateEmployee, DeleteEmployee, SearchEmployee, GetEmployeByUser, getAllEmp } = require('../controller/EmployeController')

const express = require('express')
const {AuthMiddlware} = require('../middleware/AuthMiddleware')
const EmployeeRouter= express.Router()
EmployeeRouter.use(AuthMiddlware)
EmployeeRouter.get('/getall',getAllEmp)
EmployeeRouter.post('/insertemp',CreateEmployee)
EmployeeRouter.get('/singleemployee/:id',SingleEmployee)
EmployeeRouter.put('/updateEmployee/:id',UpdateEmployee)
EmployeeRouter.delete('/deleteEmployee/:id',DeleteEmployee)
EmployeeRouter.get('/search',SearchEmployee)
EmployeeRouter.get('/getempbyuser',GetEmployeByUser)
module.exports = EmployeeRouter