const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;  
const Collection = require('../db/Collection');  

const TaskSchema = mongoose.Schema({
    taskGiver_id: { 
        type: ObjectId, 
        required: [true, "Task Giver Missing"] 
    },
    user_id: {
        type: ObjectId, 
        required: [true,'User must define']
    },
    task: [{
        task: { type: String, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Overdue'],
            default: 'Pending'
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'
        },
        dueDate: { type: Date },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });  

const TaskModel = mongoose.model(Collection.task, TaskSchema);
module.exports = TaskModel;
