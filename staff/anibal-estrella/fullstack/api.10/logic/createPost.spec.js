require('dotenv').config()

const { expect } = require('chai')
// const { cleanUp, populate, generate } = require('./helpers/tests')
const { MongoClient } = require('mongodb')
const context = require('./context')
const createPost = require('./createPost')

let client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        return createPost('649d5fcb0d6d45fc519a1b22', 'text', 'https://picsum.photos/1500?random=1')
    })
    .then(() => client.close())
    .catch(console.error)