const { CreateTask, GetTask, UpdateTask, DeleteTask, SearchFiter } = require('../controller/TaskController')
const { AuthMiddlware } = require('../middleware/AuthMiddleware')
const authorizedRoles = require('../middleware/RoleMiddleware')

const TaskRouter = require('express').Router()
TaskRouter.post('/createtask',[AuthMiddlware,authorizedRoles('admin','manager')],CreateTask);
TaskRouter.get('/gettask',[AuthMiddlware,authorizedRoles('admin','manager','user')],GetTask);
TaskRouter.put('/updatetask',[AuthMiddlware,authorizedRoles('admin','manager')],UpdateTask);
TaskRouter.delete('/deletetask',[AuthMiddlware,authorizedRoles('admin','manager')],DeleteTask);

module.exports=TaskRouter