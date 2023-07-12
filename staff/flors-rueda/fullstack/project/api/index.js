require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { helloApiHandler, retrieveLevelsHandler, retrieveLevelHandler, createLevelHandler } = require('./handlers');

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.use((req, res, next) => {
            console.log(
                "Request received: url =", req.url,
                "|| baseUrl =", req.baseUrl,
                "|| method =", req.method,
            );
            next();
        });

        api.get('/api', helloApiHandler);

        api.post('/api/levels', jsonBodyParser, createLevelHandler);

        api.get('/api/levels', retrieveLevelsHandler);

        api.get('/api/levels/:levelId', retrieveLevelHandler);

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`));

    })
    .catch((error) => {
        console.log(error)
    })
