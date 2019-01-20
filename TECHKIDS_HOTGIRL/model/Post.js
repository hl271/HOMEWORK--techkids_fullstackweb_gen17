const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    author: {type: String, required: true},
    comment: {type: String, required: true}    
}, {
    timestamps: true,
    _id: false
})

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    picture: {type: String, required: true},
    author: {type: String, required: true},
    comments: [CommentSchema],
    like: [String],
    views: {type: Number, default: 0}
}, {
    timestamps: true
})


module.exports = mongoose.model('Post', PostSchema)