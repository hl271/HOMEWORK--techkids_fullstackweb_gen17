const express = require('express')
const PostApi = express.Router()

const Post = require('../model/Post')

PostApi.use((req, res, next)=> {
    console.log('Middleware!')
    next()
})

PostApi.get('/', (req, res, next)=> {
    const {page=1, perpage=5} = req.query
    console.log(perpage)
    const searchQueries = !!req.query.search ? {title: {$regex: req.query.search, $options: "i"}} : {}
    console.log(searchQueries)
    Post.find(searchQueries)
        .skip((page-1)*parseInt(perpage))
        .limit(parseInt(perpage))
        .populate('author', '-password -_id -__v')
        .then(allPosts => {
            res.json(allPosts)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})
PostApi.get('/:id', (req, res, next)=> {
    console.log(req.params.id)
    Post.findById(req.params.id)
        .populate('author')
        .populate('comments.author')
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

PostApi.post('/comments', (req, res, next) => {
    const {author, comment, postid} = req.body
    const newComment = {author, comment}
    Post.findById(postid)
        .then(foundPost => {
            if (!foundPost) res.send({error: 'Post not foound'})
            else {
                foundPost.comments.push(newComment)
                return foundPost.save()
            }

        })
        .then(newComment => {
            res.json(newComment)
        })
        .catch(error => {
            res.send(error)
        })
})

PostApi.post('/many', (req, res, next) => {
    const {posts} = req.body
    Post.create(posts)
        .then(posts => {
            res.json(posts)
        })
        .catch(error => {
            res.send(error)
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

PostApi.delete('/', (req, res, next) => {
    Post.deleteMany({})
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
})


module.exports = PostApi