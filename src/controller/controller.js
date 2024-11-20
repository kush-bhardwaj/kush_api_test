const InsertModel = require('../model/model');
const jwt = require('jsonwebtoken')
const { genPassword, comparePass } = require('../utils/EncryptPass');
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
            }
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