require('dotenv').config();

const express = require('express');

const { cors, jsonBodyParser } = require('./utils');

const { retrieveLevelsHandler, retrieveLevelHandler, createLevelHandler } = require('./handlers');

const { MongoClient } = require('mongodb')
const context = require('./logic/context')

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.levels = db.collection('levels')

        const api = express()

        api.use(cors)

        api.post('/levels', jsonBodyParser, createLevelHandler);

        api.get('/levels', retrieveLevelsHandler);

        api.get('/levels/:levelId', retrieveLevelHandler);

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`));

    })
    .catch((error) => {
        console.log(error)
    })
