const mongodb = require('mongodb')

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://localhost:27017/data')

client.connect()
    .then(connection => {
        const users = connection.db().collection('users')
        return users.indexExists({ name: "Eddie", email: "pj@gmail.com", password: '123123123' })
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error()
    })