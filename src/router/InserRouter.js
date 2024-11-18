const express = require('express')
const { LoginUser, SignUpUser } = require('../controller/controller')
const InsertRouter = express.Router()
InsertRouter.post('/signup',SignUpUser)
InsertRouter.post('/login',LoginUser)
module.exports = InsertRouter