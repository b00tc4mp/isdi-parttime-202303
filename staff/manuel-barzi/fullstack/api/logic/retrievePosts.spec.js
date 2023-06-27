require('dotenv').config()

const { MongoClient } = require('mongodb')
const context = require('./context')
const retrievePosts = require('./retrievePosts')

let client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        return retrievePosts('6499e23e0e68119cec6f89ba',)
    })
    .then(console.log)
    .then(() => client.close())
    .catch(console.error)
