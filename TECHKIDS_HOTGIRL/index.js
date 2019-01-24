const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const request = require('request')

const UserApi = require('./router/UserApi')
const PostApi = require('./router/PostApi')
const AuthApi = require('./router/authApi')

const mongodbURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/techkids-hotgirl'
const port = process.env.PORT || 8080
mongoose.connect(mongodbURL, {useNewUrlParser: true}, ()=> {
    console.log('connected to mongodb')
})
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname+ '/assets/'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/users/',UserApi)
app.use('/api/posts/', PostApi)
app.use('/api/auth/', AuthApi)

app.get('/', (req, res, next) => {
    res.render('login')
})


app.listen(port, () => {
    console.log('Connected to port'+port)
})


