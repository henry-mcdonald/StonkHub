const express = require('express')
const app = express()
var AES = require("crypto-js/aes");

const axios = require('axios')

require('dotenv').config()

// const API_KEY = process.env.API_KEY
// const TICKER = 'AAPL'
// async function api_call(){

//     let api_result = await axios.get(`https://cloud.iexapis.com/stable/tops?token=${API_KEY}&symbols=${TICKER}`)

//     console.log(api_result.data)

// }

// api_call()



//var myString   = "blablabla Card game bla";
//var myPassword = "myPassword";

// PROCESS


var CryptoJS = require('crypto-js')
const SECRET_STRING = process.env.SECRET_STRING

var number = 1
var encrypted = CryptoJS.AES.encrypt(number.toString(), SECRET_STRING).toString();
var decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_STRING);


console.log(encrypted.toString())
console.log(decrypted.toString())

var originalText = decrypted.toString(CryptoJS.enc.Utf8);

console.log(originalText)

var trueOrFalse = 1 === "1"
console.log(trueOrFalse)


