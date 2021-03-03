const express = require('express')
const app = express()

const axios = require('axios')

require('dotenv').config()

const API_KEY = process.env.API_KEY
const TICKER = 'AAPL,AMZN'
async function api_call(){

    let api_result = await axios.get(`https://cloud.iexapis.com/stable/tops?token=${API_KEY}&symbols=${TICKER}`)

    console.log(api_result.data)

}

api_call()