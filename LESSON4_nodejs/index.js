const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('hahahahaha')
})

app.get('/file', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname+'/obj.txt')
})

app.listen(3000, (err) => {
    if (err) console.log(err)
    console.log('running...')
})