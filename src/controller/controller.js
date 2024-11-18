const InsertModel = require('../model/model');
exports.SignUpUser =async(req, res )=>{
    const data ={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    console.log(data)
    const insert = InsertModel.create(data)
    if(insert){
        res.status(200).json({
            succss:'true',
            message:"user insert"
        })
    }else{
        res.status(400).json({
            succss:'false',
            message:"failed"
        })
    }
}

//login user
exports.LoginUser = async (req,res,next) => {
   try{
    const {name,email,password} = req.body
    console.log(name,email,password);
   }
   catch(err){
    res.json({
        succss:"false",
        message:'something went wrong'
    })
   }
}