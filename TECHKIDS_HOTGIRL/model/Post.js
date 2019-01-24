const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comment: {type: String, required: true}    
}, {
    timestamps: true,
    _id: false
})

const PostSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    picture: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [CommentSchema],
    like: [String],
    views: {type: Number, default: 0}
}, {
    timestamps: true
})


module.exports = mongoose.model('Post', PostSchema)