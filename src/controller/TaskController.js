const RegisterModel = require("../model/RegisterModel");
const TaskModel = require("../model/TaskModel");
const { ObjectId } = require('mongodb')

//create task
exports.CreateTask = async (req, res) => {
    try {
        const TaskDetail = {
            taskGiver_id: new ObjectId(req.user.id),
            user_id: req.body.user_id,
            task: { task: req.body.task }
        }
        if (TaskDetail.taskGiver_id === "" || TaskDetail.taskGiver_id == undefined || TaskDetail.taskGiver_id == null) {
            return res.status(201)
                .json({
                    message: 'Task giver invalid'
                })

        }
        if (TaskDetail.task == "" || TaskDetail.task == undefined || TaskDetail.task == null) {
            return res.status(201)
                .json({
                    message: 'Task Not Define'
                })
        }
        if (TaskDetail.user_id == "" || TaskDetail.user_id == undefined || TaskDetail.user_id == null) {
            return res.status(201)
                .json({
                    message: 'User Not Exist'
                })
        }

        //check TaskGive valid
        const TaskGiver = await RegisterModel.findOne({ _id: req.user.id })
        if (!TaskGiver) {
            return res.status(401).json({
                message: 'Task Giver Not Valid'
            })
        }
        //check User Exist

        const user = await RegisterModel.findOne({ _id: TaskDetail.user_id })
        if (!user) {
            return res.status(401).json({
                message: 'User Not Valid'
            })
        }

        // check user already have task
        const isTask = await TaskModel.findOne({ user_id: TaskDetail.user_id })
        if (isTask) {
            isTask.task.push((TaskDetail.task))
            const updateTask = await isTask.save()
            return res.status(200).json({
                message: `Task Send TO User ${user.name} By ${req.user.role} ${TaskGiver.name}`
            })
        } else {
            const resData = await TaskModel.create(TaskDetail)
            resData ? res.status(200).json({
                message: `task by ${req.user.role} ${TaskGiver.name} for ${user.name} `
            }) : res.status(401).json({
                message: 'failed to create task'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(501).json({
            message: 'something went wrong'
        })
    }
}


//get task by User || Admin || Manager
exports.GetTask = async (req, res) => {
    try {
        const { id } = req.user // user id

        if (id !== "" || id.length !== 0 || id !== null || id !== 'undefined') { // id validation
            const user_task = await TaskModel.findOne({ user_id: id }) // find user task
            const TaskGiver = await RegisterModel.findOne({ _id: user_task.taskGiver_id }) // find who give task to user 
            if (user_task) {
                res.json({
                    user: req.user.name,
                    TaskGiver: `${TaskGiver.name} (${TaskGiver.role.toUpperCase()})`,
                    data: user_task.task
                })
            }
        } else {
            res.status(501)
                .json({
                    message: 'failed to find task'
                })
        }
    } catch (error) {
        res.status(404)
            .json({
                message: 'Something Went Wrong'
            })
    }
}


// Update Task Status by Admin or Manager
exports.UpdateTask = async (req, res) => {
    try {
        const { id, role } = req.user; // Logged-in user ID and role
        const { user_id, taskId, newStatus } = req.body; // user_id (the user the task belongs to), taskId (task's _id), and newStatus (new task status)
       
        // Check if user_id, taskId, and newStatus not provided
        if (!user_id || !taskId || !newStatus) {
            return res.status(400).json({
                message: 'User , Task , and new status are required.'
            });
        }

        // Find the task document by user_id
        const task = await TaskModel.findOne({ user_id: user_id });

        if (!task) {
            return res.status(404).json({
                message: 'No tasks found for the given user.'
            });
        }

        // Find the specific task in the task array by taskId
        const taskToUpdate = task.task.find(t => t._id.toString() === taskId);

        if (!taskToUpdate) {
            return res.status(404).json({
                message: 'Task with the given ID not found.'
            });
        }

        // Update the task status
        taskToUpdate.status = newStatus;

        // Save the updated task document
        await task.save();

        return res.status(200).json({
            message: 'Task status successfully updated.',
            task: taskToUpdate
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong while updating the task status.'
        });
    }
};

// Delete Task by Admin or Manager
exports.DeleteTask = async (req, res) => {
    try {
        const { id, role } = req.user; // Logged-in user ID and role
        const { user_id, taskId } = req.body; // user_id (who the task belongs to) and taskId (task's _id to be deleted)
        
        // Check if user_id and taskId are provided
        if (!user_id || !taskId) {
            return res.status(400).json({
                message: 'User ID and Task ID are required.'
            });
        }

        // Find the task by user_id
        const task = await TaskModel.findOne({ user_id: user_id });

        if (!task) {
            return res.status(404).json({
                message: 'No task found for the given user.'
            });
        }

        // Check if the task to be deleted exists in the task array
        const taskIndex = task.task.findIndex(t => t._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({
                message: 'Task with the given ID not found.'
            });
        }

        // Remove the task from the task array
        task.task.pull({ _id: taskId });

        // Save the updated task data
        await task.save();

        return res.status(200).json({
            message: 'Task successfully deleted.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong while deleting the task.'
        });
    }
};

