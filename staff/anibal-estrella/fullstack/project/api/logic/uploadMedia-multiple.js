const fs = require('fs');
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadMedia = (files) => {
    const uploadPromises = files.map(({ filePath, fileName }) => {
        return new Promise((resolve, reject) => {
            const fileData = fs.readFileSync(filePath);
            const base64Image = fileData.toString('base64');

            imagekit.upload({
                file: base64Image,
                fileName: fileName
            }, function (error, result) {
                if (error) reject(error);
                else resolve(result);
            });
        });
    });

    return Promise.all(uploadPromises);
};

module.exports = uploadMedia;
