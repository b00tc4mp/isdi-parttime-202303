const mongodb = require('mongodb');

const { MongoClient, ObjectId } = mongodb;

const client = new MongoClient('mongodb://127.0.0.1:27017/data');

client
  .connect()
  .then((connection) => {
    // const users = connection.db().collection('users');
    const posts = connection.db().collection('posts');

    // return users.insertOne({
    //   name: 'JohnDoe',
    //   email: 'john@doe.com',
    //   password: 'Tes7@@@@',
    // });

    // return posts.insertOne({
    //   author: new ObjectId('64946add075ed66566fec91b'),
    //   image: 'http://some/image.url',
    //   text: 'hello world',
    //   date: new Date(),
    // });

    return posts
      .find({ author: new ObjectId('64946add075ed66566fec91b') }) // necesitamos que se objeto en mongo
      .toArray(); // devuelve un cursor por eso lo psamos a array
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => client.close());
