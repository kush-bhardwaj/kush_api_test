require('../db/db')
const mongoose = require('mongoose')
const Collection = require('../db/Collection')
const InsertSchema = mongoose.Schema({
    name:{type:String,require:[true,'Name Missing']},
    email:{type:String,require:[true,"Email Missing"]},
    password:{type:String,require:[true,'Password Missing']}
})
const InserModule = new mongoose.model(Collection.Collection,InsertSchema);
module.exports = InserModule;