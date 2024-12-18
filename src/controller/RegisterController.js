const RegisterModel = require("../model/RegisterModel")
const { genPassword, comparePass } = require("../utils/EncryptPass")
const jwt = require('jsonwebtoken')
exports.Register = async (req, res, next) => {
    try {
        const RegisterData = {
            name: req.body.name,
            email: req.body.email,
            password: genPassword(req.body.password),
            role: req.body.role
        }
        const NewAdmin = await RegisterModel.create(RegisterData)
        if (NewAdmin) {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Register Success ${RegisterData.role}`
                })
        } else {
            res.status(403)
                .json({
                    status: 'failed',
                    message: `faile to register ${Register.role}`
                })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(404).json({
                status: 'failed',
                message: "something went wrong",
                error: err
            })
    }

}

exports.Login = async (req, res) => {
    try {
        const logingInfo = req.body;
        const resData = await RegisterModel.findOne({ email: logingInfo.email });
        const secretKey = process.env.SECRET_KEY;
        if (resData) {
            if (comparePass(logingInfo.password, resData.password)) {
                payload = {
                    name: resData.name,
                    email: resData.email,
                    id: resData._id,
                    role: resData.role
                }

                const Token = await jwt.sign(payload, secretKey, { expiresIn: "15d" })
                res.json({
                    status: 'success',
                    message: "login successfull",
                    token: Token
                })
            }
            else {
                res.json(
                    {
                        status: "failed",
                        message: "unable to login"
                    })
            }
        }
        else {
            res.json({
                status: "failed",
                message: "Account not verified"
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            status: "failed",
            message: "Unable to Loginnn",
            error: err
        })
    }

}

//get user profile
exports.GetUserProfile = async function (req, res) {
    try {
        // Include fields such as user, email, roles, and any other relevant user information. 
        const {user} = req.query
        if(user.trim() === "" || user == undefined || user == null){
            res.statu(201)
            .json({
                message:'invalid detail'
            })
        }
        // query for get user by perticular options
        const query = {
            $or: [
                { name: { $regex: `^${user}` , $options: "i"} },
                { email: { $regex: `^${user}` , $options: "i"} },
                { role: { $regex: `^${user}` , $options: "i"} }
            ]
        }
        const GetUser = await RegisterModel.find(query)
        GetUser ? res.status(200).json({
            data: GetUser
        }) : res.status(403).json({
            message: `unable to find`
        })
    } catch (error) {
        res.status(501).json({
            message: "something went wrong"
        })
    }

}
