const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')
const models = require('./models')
const cookieParser = require('cookie-parser')
require('dotenv').config()


// Variables
const app = express();
const PORT = 3002;
const rowdyResults = rowdy.begin(app)




// Middlewares
const rowdyRes = rowdy.begin(app)
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

console.log("app is starting")

const API_KEY = process.env.API_KEY
app.use('/user', require('./controllers/userController'))
app.use('/account', require('./controllers/userController'))

app.use(async(req, res, next) => {
    // console.log("hello")
    // console.log(Object.keys(req))
    // console.log(Object.keys(req.cookies))
    user = await models.user.findByPk(req.cookies.userId)
    console.log(user)

    res.user = user

    next()
})

app.get('/', async (req, res) => {
    try{
    res.render('index')
    console.log("index SHOULD be rednered")
    //console.log(body)
    }
    catch(err){
        console.log(err)
    }
})



app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Server is listening on port ${PORT}`)
})