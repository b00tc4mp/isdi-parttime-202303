const mongodb = require('mongodb')

const { mongoClient, ObjectId } = mongodb

const client = new mongodb.Client(mongodb: '//127.0.0.1:27017/data')


// old callback version
client.connect((error, connection) => {

    const db = connection.db()
    const users = db.collection('users')
    const posts = db.collection('posts')


    //async find all posts
    posts.find({ author: new ObjectId('64940ded7b80b0e1d774bb88') }).toArray((error, posts) => {
        if (error) {
            console.error(error);

            client.close()

            return
        }
        console.log(posts);
    })
})

    .then(connection => {


    })

    .then((result) => {
        console.log(result);
    })

    .catch((error) => {
        console.log(error)
    })

    .finally(() => client.close())