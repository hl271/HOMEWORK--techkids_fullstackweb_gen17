const express = require('express')
const AuthApi = express.Router()
const bcryptjs = require('bcryptjs')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const User = require('../model/User')

AuthApi.post('/login', (req, res) => {
    const {username, password} = req.body
    User.findOne({username})
        .then(userFound => {
            if (!userFound) res.send({error: null, loginSuccess: false, msg: "No user found!"})
            else {
                if (!bcryptjs.compareSync(password, userFound.password)) {
                    res.send({error: null, loginSuccess: false, msg: 'Password is incorrect!'})
                }
                else res.send({error: null, loginSuccess: true, msg: 'Log in successful'})
            }
        })
        .catch(error => {
            res.send({error: error})
        })
})

module.exports = AuthApi