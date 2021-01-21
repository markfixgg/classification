const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
var path = require('path');
const sharp = require('sharp');
const fs = require('fs')

const readImage = path => {
    const imageBuffer = fs.readFileSync(path);
    const tfimage = tfnode.node.decodeImage(imageBuffer); // Возвращает tensor
    
    return tfimage;
}

function saveImageToFile(base64str, res){
    var buf = Buffer.from(base64str,'base64');
    const outputData = new Promise(function(resolve, reject) {
        sharp(buf)
        .resize(1000, 500)
        .toFile('output.jpg', (err, info) => resolve("New image was saved! \n"));   // Ресайзим и сохраняем файл     
     })
     .then((value)=>{
        console.log(value) // Результат сохранения файла
        new Promise(async function(resolve, reject) { 
            const image = readImage("output.jpg");
            // Load the model.
            const mobilenetModel = await mobilenet.load();
            // Classify the image.
            const predictions = await mobilenetModel.classify(image);
            console.log('Classification Results:', predictions);
            resolve(predictions);
            
        })
        .then((val)=>{ 
            res.send(val) // Отправляем результат классификации
        })
    })
}

module.exports.classify = saveImageToFile;