const mongodb = require('mongodb')

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://localhost:27017/data')

client.connect()
    .then(connection => {
        const users = connection.db().collection('users')
    })