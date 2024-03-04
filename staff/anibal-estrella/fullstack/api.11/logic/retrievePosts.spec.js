require('dotenv').config()

const { expect } = require('chai')
// const { cleanUp, populate, generate } = require('./helpers/tests')
const { MongoClient } = require('mongodb')
const context = require('./context')
const retrievePosts = require('./retrievePosts')

let client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        return retrievePosts('649d5fcb0d6d45fc519a1b22',)
    })
    .then(console.error)
    .then(() => client.close())
    .catch(console.error)