const express = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../model/User')

const UserApi = express.Router()

UserApi.use((req, res, next)=> {
    console.log('Middleware')
    next()
})

UserApi.get('/', (req, res, next)=> {
    const {perpage=5, page=1} = req.query
    const searchQuery = !!req.query.search ? {username: {$regex: req.query.search, $options: "i"}} : {}
    User.find(searchQuery)
            // .select({
            //     password: 0
            // })
            .skip((parseInt(page)-1)*parseInt(perpage))
            .limit(parseInt(perpage))
            .then(users => {
                res.json(users)
            })
            .catch(error => {
                res.json({error})
            })
})

UserApi.get('/:id', (req, res, next)=> {
    User.findById(req.params.id)
        .then((user)=> {
            res.json(user)
        })
        .catch((error)=> {
            res.json({error})
        })
})

UserApi.post('/', (req, res, next)=> {
    const {username, password, avatar} = req.body
    const newUser = {username, password, avatar}
    User.create(newUser)
        .then(newUSer=> {
            res.json(newUSer)
        })
        .catch(error=> {
            res.send(error)
        })
})

UserApi.put('/:id', (req, res, next)=> {
    const {password, avatar} = req.body
    User.findById(req.params.id)
        .then(foundUser=> {
            if (!foundUser) res.send({error: 'No user found'})
            else {
                if (bcryptjs.compareSync(foundUser.password, password)) {
                    console.log('Old Pass')
                    res.send({error: 'You must type a new password!'})
                }
                else {
                    console.log('Not old pass')
                    if (!!password) foundUser.password = password
                    if (!!avatar) foundUser.avatar = avatar
                    return foundUser.save(foundUser)
                }
            }
        })
        .then(updatedUser=> {
            console.log(updatedUser)
            res.json(updatedUser)
        })
        .catch(error=> {
            console.log(error)
            res.json({error: error})
        })
})

UserApi.delete('/:id', (req, res, next)=> {
    User.findByIdAndRemove(req.params.id)
        .then(deletedUser=> {
            res.json(deletedUser)
        })
        .catch(error => {
            res.json({error})
        })
})
module.exports = UserApi