const Collection = require('../db/Collection')
const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const EMployeSchema =mongoose.Schema({
    empName:{type:String,required:[true,'employee name is required']},
    empEmail:{type:String,required:[true,'employee email is required'],unique:true},
    empPhone:{type:String,required:[true,'employee phone number required'],unique:true},
    empAddress:{type:String,required:[true,'employe address required']},
    userId:{type:ObjectId,required:[true, "user id required"]}
})
const EmployeModel = new mongoose.model(Collection.employee,EMployeSchema)
module.exports= EmployeModel;