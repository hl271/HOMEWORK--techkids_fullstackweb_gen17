const   express = require('express'),
        bodyParser = require('body-parser')

const query = require('./model/dbQuery')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname+ '/assets'))
app.set('view engine', 'ejs')

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))

// RUOTES
app.get('/', (req, res) => {
    query.getAllGames((err, games)=> {
        if (err) res.render('CreateScreen', {games: null})
        else {
            res.render('CreateScreen', {games})

        }
    })
})

app.post('/games/new', (req, res) => {
    let users = []
    req.body.user.forEach(function(username) {
        if (!!username) users.push({name: username})
    })
    console.log(users)
    query.createNewGame(users, req.body.title, (error, gameURL)=> {
        if (error) res.status(503).send(error)
        else {
            console.log('new game created', gameURL)
            res.redirect(`/games/${gameURL}`)
        }
    })
})

app.get('/games/:title', (req, res) => {
    query.getGame(req.params.title, (err, game) => {
        if (err || !game) res.redirect('/')
        else {
            query.getAllGames((err, games)=> {
                if (err) res.render('PlayScreen', {game, games: null})
                else res.render('PlayScreen', {game, games})
            })

        }
    })
})

app.post('/games/round', (req, res) => {
    query.createNewRound(req.body.gameid, (err, updatedGame)=> {
        if (err) res.send(null)
        else {
            res.json(updatedGame)
        }
    })
})

app.post('/games/update', (req, res) => {
    let score = parseInt(req.body.score)
    query.updateScoreOfGame(req.body.gameid, req.body.roundth, req.body.playerth, score, (err, updatedGame) => {
        if (err) res.send(null)
        else {
            res.json(updatedGame)
        }
    })
})

app.post('/validate-title', (req, res) => {
    query.checkIfTitleExists(req.body.title, (err, titleExists) => {
        if (err) res.status(503).send(null)
        else {
            if (titleExists) res.send(true)
            else res.send(false)
        }
    })
})

app.get('*', (req, res)=> {
    res.redirect('/')
})

app.listen(port, () => {
    console.log('Server runs at port ' + port)
})