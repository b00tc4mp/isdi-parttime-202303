const mongodb = require('mongodb')

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://127.0.0.1:27017/data')

client.connect()
    .then(connection => {
        const db = connection.db()
        const users = db.collection('users')
        const posts = db.collection('posts')

        //return users.insertOne({ author: 'PedroP', email: 'pedro@picapiedra.com', password: 'Manzana12!' })
        // return posts.insertOne({ author: new ObjectId('64931c5318b3cbc1bdcb7627'), image: 'http://image.com/smile4', text: 'Smile4', date: new Date })
        return posts.find().toArray()
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => {
        client.close()
    })