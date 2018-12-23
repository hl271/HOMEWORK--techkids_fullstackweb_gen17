const   express = require('express'),
        bodyParser = require('body-parser')

const query = require('./dbQuery')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname+ '/assets'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))


app.get('/', (req, res) => {
    let randomQuote = query.getRandomQuote()
    if (randomQuote === null) {
        res.render('index', {question: null})
    }
    else {
        res.render('index', {question: randomQuote})
    }
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/new', (req, res) => {
    let result = query.newQuote(req.body.quote)
    
    res.redirect('/new')
})

app.post('/like', (req, res) => {
    let result = query.reactToQuote(req.body.id, 'like')
    if (result === null) {
        res.send(null)
    }
    else {
        res.json(result)
    }
})

app.post('/dislike', (req, res) => {
    let result = query.reactToQuote(req.body.id, 'dislike')
    if (result === null) {
        res.send(null)
    }
    else {
        res.json(result)
    }
})

app.post('/spam', (req, res) => {
    let result = query.reactToQuote(req.body.id, 'spam')
    if (result === null) {
        res.send(null)
    }
    else {
        res.json(result)
    }
})

app.get('/all/like', (req, res) => {
    let quotes = query.getQuotesSorted('like')
    if (quotes === null) res.redirect('/')
    else res.render('all', {quotes, reaction: 'like'})
})

app.get('/all/dislike', (req, res) => {
    let quotes = query.getQuotesSorted('dislike')
    if (quotes === null) res.redirect('/')
    else res.render('all', {quotes, reaction: 'dislike'})
})

app.get('/all/spam', (req, res) => {
    let quotes = query.getQuotesSorted('spam')
    if (quotes === null) res.redirect('/')
    else res.render('all', {quotes, reaction: 'spam'})
})

app.all('*', (req, res) => {
    res.redirect('/')
})



app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log('Running on port ' + port)
})