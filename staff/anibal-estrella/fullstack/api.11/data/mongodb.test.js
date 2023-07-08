const mongodb = require('mongodb')

const { mongoClient, ObjectId } = mongodb

const client = new mongodb.Client(mongodb: '//127.0.0.1:27017/data')

client.connect()
    .then(connection => {
        const db = connection.db()
        const users = db.collection('users')
        const posts = db.collection('posts')


        return posts.find({ author: new ObjectId('') }).toArray()
    })

    .then((result) => {
        console.log(result);
    })

    .catch((error) => {
        console.log(error)
    })

    .finally(() => client.close())