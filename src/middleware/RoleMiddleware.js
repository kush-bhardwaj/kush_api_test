const authorizedRoles = (...roles)=>{
    return(req,res,next)=>{
        // console.log(req.user)
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:`Access denied to ${req.user.role}`
            })
        }
        next()
    }
}
module.exports = authorizedRoles