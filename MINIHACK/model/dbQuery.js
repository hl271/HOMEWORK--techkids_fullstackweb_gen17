const mongoose = require('mongoose')

const Game = require('./Game')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/scorekeeper'
mongoose.connect(url, {useNewUrlParser: true}, () => {
    console.log('CONNECTED!')
})

const dbQuery = {
    createNewGame: function(players, title, cb) {
        const sumOfPlayerScore = players.map(player=> {return 0})
        const newGame = {players, title, sumOfPlayerScore}
        Game.create(newGame, (error, result) => {
            console.log(result)
            if (error) cb(error, null)
            else {
                cb(null, result.title)
            }
        })

    },
    getGame: function(title, cb) {
        Game.findOne({title: title}, function(err, game) {
            if (err) cb(err, null)
            else {
                cb(null, game)
            }
        })
    },
    getAllGames: function (cb) {
        Game.find({}, function(err, games) {
            if (err) cb(er, null)
            else {
                cb(null, games)
            }
        })
    },
    createNewRound: function (gameid, cb) {
        Game.findById(gameid, function(err, game) {
            let newRound = game.players.map(player=> {return 0})
            game.rounds.push(newRound)
            game.markModified('rounds') // SINCE USING MIXED TYPE => MANUALLY MARK UPDATED TO DOC
            game.save(function(err, updatedGame) {
                if (err) cb(err, null)
                else {
                    cb(null, updatedGame)
                }
            })
        })
    },
    updateScoreOfGame: function (gameid, roundth, playerth,score,  cb) {
        Game.findById(gameid, function(err, game) {
            game.rounds[roundth][playerth] = score
            game.markModified('rounds') // SINCE USING MIXED TYPE => MANUALLY MARK UPDATED TO DOC
            game.save(function(err, updatedGame) {
                if (err) cb(err, null)
                else {
                    cb(null, updatedGame)
                }
            })
        })
    },
    checkIfTitleExists: function(title, cb) {
        Game.findOne({title: title}, (err, res) => {
            if (err) cb(err, null)
            else {
                console.log(res)
                if (!!res) cb(null, true)
                else cb(null, false)
            }
        })
    }
}

module.exports = dbQuery