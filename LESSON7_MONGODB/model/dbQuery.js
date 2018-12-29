const mongoose = require('mongoose')
const fs = require('fs')

const Quote = require('./Quote')
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/viet-vote-app'
mongoose.connect(url, {useNewUrlParser: true}, () => {
    console.log('CONNECTED!')
})
const dbQuery = {
    getAllQuotes: function() {
        Quote.find({})
            .then((err, res) => {
                console.log('RETRIEVED!')
                if (err) {
                    console.log(err)
                    return null
                }
                else {
                    console.log(res)
                    return res
                }
            })
        
    },
    getQuotesSorted: function(reaction, cb) {
        switch (reaction) {
            case 'like':
                Quote.find({})
                    .sort({"reaction.like": -1})
                    .exec((err, res) => {
                        cb(err, res)
                    })
                break
            case 'dislike':
                Quote.find({})
                    .sort({"reaction.dislike": -1})
                    .exec((err, res) => {
                        cb(err, res)
                    })
                break
            case 'spam':
                Quote.find({})
                    .sort({"reaction.spam": -1})
                    .exec((err, res) => {
                        cb(err, res)
                    })
                break
            default:
                cb(null, null)
                break
        }
    },
    getRandomQuote: function(cb) {
        Quote.count().exec((err, count) => {
            let randomIndex = Math.floor(Math.random()*count)
            Quote.findOne().skip(randomIndex).exec((err, quote) => {
                cb(err, quote)
            })
        })
        
    },
    getQuoteById: function(id, cb) {
        Quote.findById(id, (err, quote) => {
            cb(err, quote)
        })
    },
    reactToQuote: function(id, reaction, cb) {        
        if (['like', 'dislike', 'spam'].indexOf(reaction) === -1) {
            return null
        }
        else {
            Quote.findById(id, (err, quote) => {
                if (err) return null
                else {
                    switch (reaction) {
                        case 'like':
                            quote.reaction.like++
                            quote.save((err, updatedQuote) => {
                                cb(err, updatedQuote)
                            })
                            break
                        case 'dislike':
                            quote.reaction.dislike++
                            quote.save((err, updatedQuote) => {
                                cb(err, updatedQuote)
                            })
                            break
                        case 'spam':
                            quote.reaction.spam++
                            quote.save((err, updatedQuote) => {
                                cb(err, updatedQuote)
                            })
                            break
                        default:
                            cb(null, null)
                    }
                        
                }
            })
        }
    },
    addNewQuoteToDb: function(quoteContent, cb) {
        let newQuote = {
            content: quoteContent
        }
        Quote.create(newQuote, (err, result) => {
            cb(err, result)
        })
        
    }
}

module.exports = dbQuery