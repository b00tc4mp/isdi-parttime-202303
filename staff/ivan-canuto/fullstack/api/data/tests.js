const mongodb = require('mongodb')

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://localhost:27017/data')

client.connect()
    .then(connection => {
        const db = connection.db()

        const users = db.collection('users')
        const posts = db.collection('posts')

        // return users.insertOne({name: "Wendy Darling", email: "wendy@darling.com", password: "123123123"})
        // return posts.insertOne({ author: new mongodb.ObjectId("64940ff8e26afb11b9f8feaa"), image: "http://image.com/wendy/1", text: "Hello Wendy", date: new Date })
        return posts.find({ author: new mongodb.ObjectId("64940ff8e26afb11b9f8feaa")}).toArray()
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))
    .finally(() => client.close())