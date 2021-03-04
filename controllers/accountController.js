const router = require('express').Router()
const db = require('../models')
require('dotenv').config()
const axios = require('axios')
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js")
const models = require('../models')


const API_KEY = process.env.API_KEY
const SECRET_STRING = process.env.SECRET_STRING


//router.get('/', (req, res) => {
//    console.log("blank account screen")
//    res.redirect('account/dashboard')
//})


// router.get('/', (req, res, next) => {
//     console.log("blank account screen")
//     next()
// })

router.get('/dashboard', async(req, res) => {
    console.log("dashboard should be rendereds")
    
    const decrypted = AES.decrypt(req.cookies.encryptedUserId, SECRET_STRING)
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8)
    const user = await models.user.findByPk(plaintext)

    let user_holdings = await models.holding.findAll({
        where: {user_id: user.id}
    })
    console.log(user_holdings)
    res.render('account/dashboard', {user_holdings:user_holdings})


})

router.get('/placetrade', (req, res) => {
    console.log("dashboard should be rendereds")
    res.render('account/placetrade')
})

router.post('/placetrade', async (req, res) => {
    console.log("this should place a trade")
    console.log("tx table should be appended and user table + holdings table should be updated")
    const ticker = req.body.ticker
    const qty = req.body.quantity
    const orderType = req.body.ordertype
    let signedqty
    let transactionIsValid = true //edit this later to do some logic
    if (orderType === "Buy") {
        signedqty = qty
    } else if (orderType === "Sell") {
        signedqty = -1 * qty
    }

    let price = "UNKOWN -- API DID NOT RETURN"
    try {
        let api_call = `https://cloud.iexapis.com/stable/tops?token=${API_KEY}&symbols=${ticker}`
        //let api_result = await axios.get(api_call)
        price = api_result.data[0].lastSalePrice
    }
    catch (err) {
        console.log(err)
    }
    const costOfTransaction = price * signedqty


    const decrypted = AES.decrypt(req.cookies.encryptedUserId, SECRET_STRING)
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8)
    const user = await models.user.findByPk(plaintext)

    const holding = await models.holding.findOne({
        where: { user_id: user.id, ticker: ticker }
    })

    if (transactionIsValid) {

        if (!holding) {

            const newHolding = await models.holding.create({
                user_id: user.id,
                ticker: ticker,
                latest_price: price,
                holding_size: signedqty
            })
        } else {
            const updatedHolding = await holding.update({
                holding_size: holding.holding_size + signedqty
            })

        }

        const updateUser = await user.update({
            cashvalue: user.cashvalue - costOfTransaction
        })
    }

    console.log(holding)


    const tradeMessage = `{req.user.email}, your ${orderType} order was entered for ${qty} shares of ${ticker} at price $${price}`


    res.render('account/placetrade', { message: tradeMessage })
})


module.exports = router

