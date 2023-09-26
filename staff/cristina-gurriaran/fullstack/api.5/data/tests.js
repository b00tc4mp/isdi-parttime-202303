const mongodb = require('mongodb')

const { MongoClient } = mongodb
const { ObjectId } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017/data')

client.connect()
    .then(connection => {
        const db = connection.db()
        
        const users = db.collection('users')
        const posts = db.collection('posts')
        
        // return users.insertOne({ name: 'Wendy2', email: 'wendy2@darling.com', password: '123123123'})

        // return posts.insertOne({ author: new mongodb.ObjectId("64930dc90e4fda6eb92a4e6d"), image: 'image2', text: 'Hello Pepito', date: new Date})

        // return users.deleteOne({ _id: new ObjectId("64934eabda279bd3998f131a") })

        // return posts.deleteOne({ _id: new ObjectId("64931d44540b660ec7f46bc7") })

        return users.find().toArray()
    })
    .then (result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => client.close())


