const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://127.0.0.1:27017/data')

client.connect()
    .then(connection => {
        const db = connection.db()

        const users = db.collection('users')
        const posts = db.collection('posts')

        //return users.insertOne({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123' })
        //return users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', password: '123123123' })
        //return posts.insertOne({ author: new ObjectId('6491fc786748ebdb6729efc3'), image: 'http://image.com/wendy/1.jpg', text: 'hello wendy 1', date: new Date })
        return posts.find({ author: new ObjectId('6491fc786748ebdb6729efc3') }).toArray()
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => client.close())