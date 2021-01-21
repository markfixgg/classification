const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
var path = require('path');
const sharp = require('sharp');
const fs = require('fs')
const TeachableMachine = require("@sashido/teachablemachine-node");
const config = require('config');


const readImage = path => {
    const imageBuffer = fs.readFileSync(path);
    return tfnode.node.decodeImage(imageBuffer); // Возвращает tensor
}

// LOAD MODEL
const model = new TeachableMachine({
    modelUrl: config.modelURL
});

function classify(base64str, res){
    var buf = Buffer.from(base64str,'base64');
    new Promise(function(resolve, reject) {
        sharp(buf)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(1000, 500)
        .toFile('output.jpg', (err, info) => resolve("New image was saved! \n"));   // Ресайзим и сохраняем файл     
     })
     .then((value)=>{
        console.log(value) // Результат сохранения файла
        new Promise(async function(resolve, reject) { 
            // PREDICT
            model.classify({
                imageUrl: "http://127.0.0.1/getimage",
              }).then((predictions) => {
                console.log("Predictions:", predictions);
                resolve(predictions);
              }).catch((e) => {
                console.log("ERROR", e);
                reject("error")
              });
        })
        .then((val)=>{ 
            res.send(val) // Отправляем результат классификации
        })
    })
}

module.exports.classify = classify;