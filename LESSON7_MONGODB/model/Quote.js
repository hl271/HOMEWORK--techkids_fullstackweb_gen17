const mongoose = require('mongoose')

const ReactionSchema = new mongoose.Schema({
    like: {type: Number, default: 0, required: true}, 
    dislike: {type: Number, default: 0}, 
    spam: {type: Number, default: 0}
})
const QuoteSChema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    reaction: {
        type: ReactionSchema,
        default: () => ({like: 0, dislike: 0, spam: 0})
    }
})

module.exports = mongoose.model('Quote', QuoteSChema)