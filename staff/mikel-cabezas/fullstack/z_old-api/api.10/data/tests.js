const mongodb = require('mongodb')

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://localhost:27017/data')

client.connect()
    .then(connection => {
        const users = connection.db().collection('users')
        const posts = connection.db().collection('posts')

        return users.insertOne({ name: "Mikel Cabezas 2", email: "mikelcabezas2@gmail.com", password: "123123123" })
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => client.close)