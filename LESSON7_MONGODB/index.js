const   express = require('express'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        mongoose = require('mongoose'),
        MongoStore = require('connect-mongo')(session),
        cookieParser = require('cookie-parser')




const query = require('./model/dbQuery')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname+ '/assets'))
app.set('view engine', 'ejs')

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: "walker id 271",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 7200000, httpOnly: true}
}))

// // TODO: Check users' vote based on their IP ADDRESS\
// function getIpAddress() {
//     var interfaces = os.networkInterfaces();
//     var addresses = [];
//     console.log(interfaces)
//     for (var k in interfaces) {
//         for (var k2 in interfaces[k]) {
//             var address = interfaces[k][k2];
//             if (address.family === 'IPv4' && !address.internal) {
//                 addresses.push(address.address);
//             }
//         }
//     }
//     return addresses
// }

app.get('/', (req, res) => {  
     
    query.getRandomQuote((err, quote) => {
        if (err) console.log(err)
        else {
            if (quote === null) {
                res.render('index', {question: null})
            }
            else {
                res.render('index', {question: quote})
            }
        }
    })
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/new', (req, res) => {
    query.addNewQuoteToDb(req.body.quote, (err, quote) => {
        if (err) {
            console.log('ERROR WHILE ADDING NEW QUOTE\n', err)
        }
        else res.redirect('/new')

    })
    
})

app.get('/quote/:id', (req, res) => {
    let quote = query.getQuoteById(req.params.id)
    res.render('singleQuote', {quote: quote}) 
})

app.post('/react', (req, res) => {
    console.log(req.body.id, req.body.reaction, req.session[req.body.id], !!req.cookies['connect.sid'])
    if (['like', 'dislike', 'spam'].indexOf(req.body.reaction) === -1) res.send(null)
    else if (!req.cookies['connect.sid'] || !!req.session[req.body.id]) res.send(null)
    else {
        query.reactToQuote(req.body.id, req.body.reaction, (err, result) => {
            if (err) res.send(null)
            else {
                req['session'][req.body.id] = true
                res.json(result)
            }
        })
        

    }
})



app.get('/all/:reaction', (req, res) => {
    let reaction = req.params.reaction
    query.getQuotesSorted(reaction, (err, quotes) => {
        if (!quotes) res.redirect('/')
        else if (err) {
            console.log(err)
            res.redirect('/')
        }
        else {
            res.render('all', {quotes, reaction: reaction})
        }

    })
})



app.all('*', (req, res) => {
    res.redirect('/')
})



app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log('Running on port ' + port)
})