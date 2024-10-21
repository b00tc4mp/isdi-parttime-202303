require('dotenv').config()

const mongoose = require('mongoose')
const uploadMedia = require('./uploadMedia')
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {

        const filePath = path.join(__dirname, '../data-project/test/menItrust-01.jpg');
        return uploadMedia(filePath, 'menItrust-01.jpg')
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
