const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs')
const readImage = require("./modules/readImagePath");
  
const imageClassification = async path => {
    const image = readImage(path);
    // Load the model.
    const mobilenetModel = await mobilenet.load();
    // Classify the image.
    const predictions = await mobilenetModel.classify(image);
    console.log('Classification Results:', predictions);
}

if (process.argv.length !== 3) throw new Error('Incorrect arguments: node classify.js <IMAGE_FILE>');

async function onStart(){
    await imageClassification(process.argv[2]);
    console.log("App successfully started!")
}

onStart()