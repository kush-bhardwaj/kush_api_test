const InsertModel = require('../model/model');
const jwt = require('jsonwebtoken')
const { genPassword, comparePass } = require('../utils/EncryptPass');
const EmployeModel = require('../model/EmpModel');
exports.SignUpUser = async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: genPassword(req.body.password)
    }
    console.log(data)
    const insert = InsertModel.create(data)
    if (insert) {
        res.status(200).json({
            succss: 'true',
            message: "user insert"
        })
    } else {
        res.status(400).json({
            succss: 'false',
            message: "failed"
        })
    }
}

//login user
exports.LoginUser = async (req, res, next) => {
    try {
        const loginInfo = req.body
        const query = { email: loginInfo.email }
        const scretKey = process.env.SECRET_KEY
        const resData = await InsertModel.findOne(query)
        if (resData) {
            if (comparePass(loginInfo.password, resData.password)) {
                const payload = {
                    name: resData.name,
                    email: resData.email,
                    user_id: resData._id
                }
                const jsonToken = await jwt.sign(payload, scretKey, { expiresIn: '15d' })
                res.status(200).json({
                    succss: 'true',
                    message: 'login successfull',
                    token: jsonToken
                })
            }else{res.json({
                success:'false',
                message:'incorrect password or email'
            })}
        } else {
            res.status(203).json({
                success: 'false',
                message: res.status(203)
            })
        }
    }
    catch (err) {
        res.json({
            succss: "false",
            message: 'something went wrong'
        })
    }
}

//get employee data by user's
exports.getByUser = async (req, res) => {
   try{
     //user id 
     const { user_id } = req;
     //check user exist || not

     const checkUser = await InsertModel.findOne({_id:user_id})
     if(checkUser){
        const getEmp = await EmployeModel.find({userId:user_id})
        res.status(200).json({
            success:'true',
            data:getEmp
        })
     }else{
         res.status(200).json({
            success:'false',
            message:'unable to find please try again later'
         })
     }
   }catch(err){
    res.json({
        success:'false',
        message:'something went wrong try again later'
    })
   }

}