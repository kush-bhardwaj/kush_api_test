const bcrypt = require('bcryptjs')
exports.genPassword =(password)=>{
    const genSalt = bcrypt.genSaltSync(15)
    return bcrypt.hashSync(password,genSalt)
}
exports.comparePass = (oldpassword , hash)=>{
    return bcrypt.compareSync(oldpassword ,hash)
}