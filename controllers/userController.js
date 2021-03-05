const router = require('express').Router()
const SECRET_STRING = process.env.SECRET_STRING
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js")
const models = require('../models')



const initial_acct_value = 2000

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

router.get('/login', (req, res,next) => {
    console.log("login screen should be rendered")
    //res.redirect('login')
    res.render('user/login')

})

router.get('/signup', (req, res) => {
    console.log("signup screen should be rendereds")
    res.render('user/signup',{user:req.user})
})

router.post('/signup', async(req, res,next) => {
    const attemptedEmail = req.body.email
    const checkIfExists = await models.user.findOne({
        where: {email:attemptedEmail}
    })
    if(checkIfExists){
        res.redirect('signup')
        return
    }


    const newUser = await models.user.create({
        email: req.body.email,
        hashedpassword: req.body.hashedpassword,
        accountvalue: initial_acct_value,
        cashvalue: initial_acct_value
    })
    const userString = newUser.id.toString()
    const encryptedUserId = AES.encrypt(userString,SECRET_STRING).toString()
    res.cookie('encryptedUserId', encryptedUserId)
    // res.user = newUser
    res.render('user/help',{user: newUser})
})

router.post('/login', async(req, res) => {
    // res.send('you just submitted a login form')
    // look up the user who has the incoming email
    const user = await models.user.findOne({
            where: { email: req.body.email }
        })
        // check if that user's password matches the incoming password
    if (user.hashedpassword === req.body.hashedpassword) {
        // if yes, set cookie userId = user.id
        const userString = user.id.toString()
        const encryptedUserId = AES.encrypt(userString,SECRET_STRING).toString()
        res.cookie('encryptedUserId', encryptedUserId)
        res.render('index',{user:user})
            // if no, re-render the login form
    } else {
        res.render('user/login')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('encryptedUserId')
    res.user = undefined
    req.user = undefined
    //console.log(res.user)
    res.render('index',{user:undefined})
})


module.exports = router