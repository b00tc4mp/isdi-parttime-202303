const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://localhost:27017/data')

client.connect()
    .then(connection => {
        const db = connection.db()

        const users = db.collection('users')
        const posts = db.collection('posts')

        //return users.insertOne({ name: 'Anna', email: 'anna@renau.com', password: 'Anna1' })
        //return posts.insertOne({ author: new ObjectId('649317e50a860865163b682e'), image: 'image.url', text: 'hello world', date: new Date })
        return posts.find({ author: new ObjectId('649317e50a860865163b682e') }).toArray()
    })
    .then(result  => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => client.close())