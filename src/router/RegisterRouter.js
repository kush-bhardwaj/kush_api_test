const { Register, Login, GetUserProfile } = require('../controller/RegisterController')

//Authrization MiddleWare
const { AuthMiddlware } = require('../middleware/AuthMiddleware')

// Login Limit Rate MiddleWare
const loginLimiter = require('../middleware/LoginLimit')

//Role base access MiddleWare
const authorizedRoles = require('../middleware/RoleMiddleware')
const RegisterRouter = require('express').Router()


RegisterRouter.post('/signup', Register)
RegisterRouter.post('/login', loginLimiter, Login)
RegisterRouter.get('/getuser', [AuthMiddlware, authorizedRoles("admin", 'manager')], GetUserProfile)

module.exports = RegisterRouter;