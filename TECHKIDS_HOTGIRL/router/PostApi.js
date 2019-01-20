const express = require('express')
const PostApi = express.Router()

const Post = require('../model/Post')

PostApi.use((req, res, next)=> {
    console.log('Middleware!')
    next()
})

PostApi.get('/', (req, res, next)=> {
    const {page=1, perpage=5} = req.query
    const searchQueries = !!req.query.search ? {title: {$regex: req.query.search, $options: "i"}} : {}
    console.log(searchQueries)
    Post.find(searchQueries)
        .skip((page-1)*perpage)
        .limit(perpage)
        .then(allPosts => {
            res.json(allPosts)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})
PostApi.get('/:id', (req, res, next)=> {
    Post.findById(req.params.id)
        .then(foundPost => {
            res.json(foundPost)
        })
        .catch(error => {
            res.send({error})
        })
})
PostApi.post('/', (req, res, next)=> {
    const {title, description, picture, author} = req.body
    const newPost = {title, description, picture, author}
    Post.create(newPost)
        .then(createdPost => {
            res.json(createdPost)
        })
        .catch(error => {
            res.send({error})
        })
})
PostApi.put('/:id', (req, res, next)=> {
    const {title, description, picture, author} = req.body
    Post.findById(req.params.id)
        .then(foundPost => {
            if (!foundPost) res.send({error: 'No post found'})
            else {
                if (!!title) foundPost.title = title
                if (!!description) foundPost.description = description
                if (!!picture) foundPost.picture = picture
                if (!!author) foundPost.author = author
                return foundPost.save()
            }
        })
        .then(updatedPost => {
            res.json(updatedPost)
        })
        .catch(error => {
            res.send({error})
        })
})
PostApi.delete('/:id', (req, res, next)=> {
    Post.findByIdAndRemove(req.params.id)
        .then(deletedPost => {
            res.json(deletedPost)
        })
        .catch(error => {
            res.send({error})
        })
})


module.exports = PostApi