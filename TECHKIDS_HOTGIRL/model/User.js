const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    avatar: {type: String}
})

UserSchema.pre('save', function (next) {
    const {password} = this
    
    console.log(password)
    if (this.isModified('password')) {        
        const salt = bcryptjs.genSaltSync(12)
        const hashedPass = bcryptjs.hashSync(password, salt)
        this.password = hashedPass        
    }
    next()
})
module.exports = mongoose.model('User', UserSchema)