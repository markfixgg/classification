// Main module
const myUtils = require("./modules/myUtils")

// Express initial
const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");

// Express config
const app = express()
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json())
app.use(cors({ origin: '*', credentials :  true}))


app.post("/classify", async (req, res) => myUtils.classify(req.body.base64, res)) // main route

app.get('/getImage', (req, res) => res.sendFile(`${__dirname}/output.jpg`)); // возвращает картинку


app.listen(80, () => {console.log(`App started!`)});
