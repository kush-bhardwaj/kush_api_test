const jwt = require('jsonwebtoken')
exports.AuthMiddlware = async(req, res,next)=>{
   try{
    const scretKey = process.env.SECRET_KEY
    const Token = req.headers['authorization'].split(" ")[1]
    const Auth =  jwt.verify(Token,scretKey)
    if(Auth) {
        req.user_id = Auth.user_id 
        next()
    }else{
        res.status(203).json({
            success:'false',
            message:"unAuthorized user"
        })
    }
   }catch(err){
    res.status(401).json({
        success:'false',
        message:"unAuthorized user detect"
    })
   }
}