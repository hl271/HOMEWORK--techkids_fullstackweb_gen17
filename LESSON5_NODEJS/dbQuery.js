const fs = require('fs')

const dbQuery = {
    getAllData: function() {
        return fileData = JSON.parse(fs.readFileSync('./db.json', {encoding: 'utf-8'}))
    },
    getAllQuotes: function() {
        let fileData = JSON.parse(fs.readFileSync('./db.json', {encoding: 'utf-8'}))
        return fileData.quotes
    },
    getQuotesSorted: function(reaction) {
        let quotes = this.getAllQuotes()
        switch (reaction) {
            case 'like':
                return quotes.sort((a, b) => b.like - a.like)
            case 'dislike':
                return quotes.sort((a, b) => b.dislike - a.dislike)
            case 'spam':
                return quotes.sort((a, b) => b.spam - a.spam)
            default:
                return null
        }
    },
    getRandomQuote: function() {
        let quotes = this.getAllQuotes() //cannot use arrow function
        if (quotes.length === 0) {
            return null
        }
        else {
            let random = Math.floor(Math.random()*quotes.length)
            return quotes[random]
    
        }
    },
    reactToQuote: function(id, reaction) {
        let fileData = this.getAllData()
        let quotes = fileData.quotes
        let quote = quotes[id]
        if (quote === undefined || ['like', 'dislike', 'spam'].indexOf(reaction) === -1) {
            return null
        }
        else {
            quote[reaction]++
            fs.writeFileSync('./db.json', JSON.stringify(fileData))
            return quote
        }
    },
    newQuote: function(quoteContent) {
        let fileData = this.getAllData()
        let quotes =fileData.quotes
        let newQuote = {
            content: quoteContent,
            like: 0,
            dislike: 0,
            spam: 0,
            id: quotes.length
        }
        quotes.push(newQuote)
        fs.writeFileSync('./db.json', JSON.stringify(fileData))
        return newQuote
    }
}

module.exports = dbQuery