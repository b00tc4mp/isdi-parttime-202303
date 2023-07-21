require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { helloApiHandler, retrieveLevelsHandler, retrieveLevelHandler, createLevelHandler, authenticateUserHandler, registerUserHandler, retrieveUserHandler, retrieveUserLoggedHandler } = require('./handlers');

const mongoose = require('mongoose');

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

        api.post('/api/users', jsonBodyParser, registerUserHandler);

        api.post('/api/users/auth', jsonBodyParser, authenticateUserHandler);

        api.get('/api/users/:userId', retrieveUserHandler);

        api.get('/api/users/auth/:userId', retrieveUserLoggedHandler);

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`));

    })
    .catch((error) => {
        console.log(error)
    })