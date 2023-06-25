const express = require('express');
const app = express();
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/mklhds/demo-imagekit/',
    publicKey: 'public_KXJOz0g5Xp6gAlhANXjoCNjKLPs=',
    privateKey: 'private_PZ61mBGO1+6tP+Wny4KqsZ7XT0Q='
});
const api = express()
// allow cross-origin requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/auth', function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});

api.listen(3001, function () {
    console.log('Live at Port 3001');
});



api.get(`/image/:image`, (req, res) => {
    let imagePath
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    imagekit.getFileDetails("64986e4206370748f20901f9", function (error, result) {
        if (error) console.log(error);
        else {
            console.log(result)
            imagePath = result
            // var result = imagekit.getAuthenticationParameters();
            res.send(result);

        }
    });

});