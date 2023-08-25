require('dotenv').config()

const mongoose = require('mongoose')
const uploadMedia = require('./uploadMedia')
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        console.log("Connected to the database.");
        return Promise.resolve();
    })
    .then(() => {
        // You can test with different file types, just modify the filePath
        const filePath = path.join(__dirname, '../data-project/test/menItrust-01.jpg'); // or .mp3 or .jpg
        return uploadMedia(filePath, 'menItrust-01.jpg') // make sure you provide the correct filename
    })
    .then(response => {
        console.log("Upload response:", response);
        console.log("Media successfully uploaded!");
    })
    .catch(error => {
        console.error("Error uploading media:", error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
