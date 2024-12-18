const mongoose = require('mongoose')
const Collection = require('../db/Collection')
const RegisterSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Admin name must']
    },
    email:{
        type:String,
        required:[true,'Email required']
    },
    password:{type:String,
        required:[true,"Password required"],
        // match: [
        //     /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
        //     'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
        // ]
    },
    role:{
        type:String,
        required:true,
        enum:['admin','manager','user']
    }
})
const RegisterModel = new mongoose.model(Collection.Admin,RegisterSchema)
module.exports = RegisterModel