const rateLimit = require('express-rate-limit')
const loginLimiter = rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:'to many attempt please try again',
    standardHeaders:true,
    legacyHeaders:false
})
module.exports = loginLimiter;