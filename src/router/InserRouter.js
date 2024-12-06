const express = require('express')
const {AuthMiddlware} = require('../middleware/AuthMiddleware')
const { LoginUser, SignUpUser, getByUser } = require('../controller/controller')
const InsertRouter = express.Router()
InsertRouter.post('/signup',SignUpUser)
InsertRouter.post('/login',LoginUser)
InsertRouter.get('/getempbyuser',AuthMiddlware,getByUser)
module.exports = InsertRouter