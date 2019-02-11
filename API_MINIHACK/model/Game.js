const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    name: String
})

// const RoundSchema = new mongoose.Schema({
//     round: {type: Array}
// })

const GameSchema = new mongoose.Schema({
    players: [PlayerSchema],
    title: String,
    rounds: {type: {foo: String}, default: []} //HAVE TO USE MIXED TYPE SINCE MONGOOSE DOESN'T SUPPORT WELL 2D ARRAY

}, {
    timestamps: true
})


module.exports = mongoose.model('Game', GameSchema)