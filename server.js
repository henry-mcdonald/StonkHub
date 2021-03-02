const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const rowdy = require('rowdy-logger')
const axios = require('axios')

require('dotenv').config()


// Variables
const app = express();
const PORT = 3002;
const rowdyResults = rowdy.begin(app)




// Middlewares
// Sets EJS as the view engine
app.set('view engine', 'ejs')
// Specifies the location of the static assets folder
app.use(express.static('public'))
// Enables EJS Layouts middleware
app.use(ejsLayouts)
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }))
// Adds some logging to each request
app.use(require('morgan')('dev'))

const API_KEY = process.env.API_KEY

app.use('/users', require('./controllers/usersController'))


app.get('/', async (req, res) => {
    try{
    res.render('users/login')
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