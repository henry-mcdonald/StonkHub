const express = require('express')
const app = express()
var AES = require("crypto-js/aes");

const axios = require('axios')

require('dotenv').config()

const API_KEY = process.env.API_KEY
const TICKER = 'AAPL'
async function api_call(){
    let call_string = `https://cloud.iexapis.com/stable/tops?token=${API_KEY}&symbols=${TICKER}`
    let api_result = await axios.get(call_string)
    console.log(call_string)
    console.log(api_result.data)

}

api_call()




