require('dotenv').config

const createPost = require('./createPost')
const context = require('./context')
const { MongoClient } = require('mongodb')

let client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        return createPost("6499f0af971d6f7386087ce8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPozuu1mN6rFHPGcRP-uzNzYOPwlAhykr3Jw&usqp=CAU", "smile")
    })
    .then(() => client.close())
    .catch(console.error)
