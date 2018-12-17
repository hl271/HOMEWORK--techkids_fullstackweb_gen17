const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname+'/view'))
app.use(express.static(__dirname+'/assets'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})
app.get('/about', (req, res) => {
    res.sendFile(__dirname+'/view/about.html')
})

app.listen(port, (error) => {
    if (error) console.log(error)
    else console.log('Running on port ' + port)
})