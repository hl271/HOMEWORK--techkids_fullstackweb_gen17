const   express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors')

const query = require('./controller')
const app = express()
const port = process.env.PORT || 4000


// MIDDLEWARES
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// RUOTES
app.get('/games', (req, res) => {
    query.getAllGames((err, games)=> {
        res.json({err, games})
    })
})

app.post('/games', (req, res) => {
    query.validateTitle(req.body.title, (err, result) => {
        if (err) res.json({error: {msg: 'error on server'}})
        else if (!result.isValid) res.json({error: result})
        else {

            let users = []
            req.body.user.forEach(function(username) {
                if (!!username) users.push({name: username})
            })
            query.createNewGame(users, req.body.title, (error, gameURL)=> {
                res.json({error, gameURL})
            })
        }
    })
})

app.get('/games/:title', (req, res) => {
    query.getGame(req.params.title, (err, game) => {
        res.json({err, game})
    })
})

app.post('/games/round', (req, res) => {
    query.createNewRound(req.body.gameid, (err, updatedGame)=> {
        res.json({err, updatedGame})
    })
})

app.put('/games', (req, res) => {
    let score = parseInt(req.body.score)
    query.updateScoreOfGame(req.body.gameid, req.body.roundth, req.body.playerth, score, (err, updatedGame) => {
        res.json({err, updatedGame})
    })
})

app.post('/validate-title', (req, res) => {
    
    query.validateTitle(req.body.title, (err, res) => {
        res.json({err, res})
    })
})

app.get('*', (req, res)=> {
    res.send(null)
})

app.listen(port, () => {
    console.log('Server runs at port ' + port)
})