require('dotenv').config();

const mongoose = require('mongoose');
const uploadMedia = require('./uploadMedia-multiple');


mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const files = [
            { filePath: './data-project/test/pearlJam-01.webp', fileName: 'pearlJam-01.webp' },
            { filePath: './data-project/test/menItrust-02.jpg', fileName: 'menItrust-02.jpg' },
            // Add more files as needed
        ];

        return uploadMedia(files);
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
