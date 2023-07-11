require('dotenv').config()

const { MongoClient } = require('mongodb')
const context = require('./context')
const createPost = require('./createPost')

let client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        return createPost('6499e23e0e68119cec6f89ba', 'https://t4.ftcdn.net/jpg/02/42/18/37/360_F_242183761_BaDpHZaxSBVIFhgSCNS2w8mEvdu3Oy6Q.jpg', 'smile )')
    })
    .then(() => client.close())
    .catch(console.error)
