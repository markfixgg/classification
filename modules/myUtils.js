const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
var path = require('path');
const sharp = require('sharp');
const fs = require('fs')

const readImage = path => {
    //reads the entire contents of a file.
    //readFileSync() is synchronous and blocks execution until finished.
    const imageBuffer = fs.readFileSync(path);
    //Given the encoded bytes of an image,
    //it returns a 3D or 4D tensor of the decoded image. Supports BMP, GIF, JPEG and PNG formats.
    const tfimage = tfnode.node.decodeImage(imageBuffer);
    return tfimage;
}

function saveImageToFile(base64str, res){
    var buf = Buffer.from(base64str,'base64');
    const outputData = new Promise(function(resolve, reject) {
        sharp(buf)
        .resize(1000, 500)
        .toFile('output.jpg', (err, info) => {resolve("New image was saved! \n") });        
     }).then((value)=>{
        console.log(value) // Результат сохранения файла

        new Promise(async function(resolve, reject) { 
            const image = readImage("output.jpg");
            // Load the model.
            const mobilenetModel = await mobilenet.load();
            // Classify the image.
            const predictions = await mobilenetModel.classify(image);
            console.log('Classification Results:', predictions);
            resolve(predictions);
            
        }).then((val)=>{ // Результат классификации
            res.send(val)
        })

    })
}

module.exports.classify = saveImageToFile;