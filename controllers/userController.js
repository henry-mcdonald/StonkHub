const router = require('express').Router()
const db = require('../models')


//  router.get('/', (req, res) => {
//      console.log("the /users should be rendered")
//      res.render('index')
//  })

// router.post('/', async(req, res) => {
//     const newUser = await db.user.create({
//         email: req.body.email,
//         password: req.body.password
//     })
//     res.cookie('userId', newUser.id)
//     res.redirect('users/new')
// })

router.get('/login', (req, res) => {
    console.log("login screen should be rendered")
    res.render('user/login')
})

router.get('/signup', (req, res) => {
    console.log("signup screen should be rendereds")
    res.render('user/signup')
})

router.post('/signup', async(req, res) => {
    const newUser = await db.user.create({
        email: req.body.email,
        hashedpassword: req.body.hashedpassword
    })
    res.cookie('userId', newUser.id)
    res.render('user/help',{email: req.body.email})
})

router.post('/login', async(req, res) => {
    // res.send('you just submitted a login form')
    // look up the user who has the incoming email
    const user = await db.user.findOne({
            where: { email: req.body.email }
        })
        // check if that user's password matches the incoming password
    if (user.hashedpassword === req.body.hashedpassword) {
        // if yes, set cookie userId = user.id
        res.cookie('userId', user.id)
        res.render('user/help',{email:user.email})
            // if no, re-render the login form
    } else {
        res.render('user/login')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})


module.exports = router