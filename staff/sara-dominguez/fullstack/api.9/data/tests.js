const mongodb = require('mongodb')

// modo "antiguo"
const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://127.0.0.1:27017/data')

//promesas

client.connect()
    .then(connection => {
        //para añadir usuarios
        // const users = connection.db().collection('users')
        // return users.insertOne({ name: 'Wendy Darling', email: 'wendy@darling.com', password: 'Aa-1234' })

        //para añadir posts

        const posts = connection.db().collection('posts')
        // return posts.insertOne({ author: new ObjectId("6496d6c3830ae66cfe214e2f"), image: "https://jpeg.org/images/aic-home.jpg", text: '😍', date: new Date })

        //retornar posts y convertirlo en array

        return posts.find().toArray()

    })

    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => client.close())
