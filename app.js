const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');

const myUtils = require("./modules/myUtils")
var path = require('path');
const sharp = require('sharp');

const express = require('express')
const cors = require('cors');
const util = require("util");
const fs = require('fs')
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
app.use(bodyParser.json())
app.use(cors({ origin: '*', credentials :  true}))


app.post("/classify", async (req, res)=>{
    var test = myUtils.classify(req.body.base64, res);
})

app.listen(80, () => {console.log(`App started!`)});
