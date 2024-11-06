require('dotenv').config({path:"./.env"})
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL).then((res)=>{
    console.log("Datbase conneted")
}
,(err)=>{
    console.log(err)
    console.log("failed to connect databse")
})