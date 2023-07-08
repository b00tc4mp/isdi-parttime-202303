const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose
// cereate the mogoose user schema for the users object
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    }
})
const post = new Schema({
    author: {
        // to reference anopther object from user
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})
// use the model to create instances of the model 'name' to reference the model, and the schema 
// returns a class
const User = model('User', user)
const Post = model('Post', post)

mongoose.connect('mongodb://127.0.0.1:27017/data')
    // return an array with 2 promises to clean the db
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    ////////multiple steps:
    //use the "factory" method create
    // .then(() => {
    //     return User.create({ name: 'ma nu', email: 'manu@gmail.com', password: '123123123' })

    // })
    // // returns the user now "connected"
    // .then(user => {
    //     //change the name property
    //     user.name = 'ma nus'
    //     //save it
    //     return user.save()
    // })
    // .then(user => {
    //     //create a post that referene the author prperty to the user id using a getter underthehood
    //     return Post.create({
    //         author: user.id, image: `https://picsum.photos/1500?random=${Math.floor(Math.random() * 999) + 1}`, text: 'Some cool text',
    //     })
    // })

    /////// one step creation
    .then(() => {
        const user = new User({ name: 'ma nu', email: 'manu@gmail.com', password: '123123123' })
        const post = new Post({ author: user.id, image: `https://picsum.photos/1500?random=${Math.floor(Math.random() * 999) + 1}`, text: 'Some cool text' })
        post.author = user.id

        return Promise.all([user.save(), post.save()])
    })
    .then((user, post) => {

    })
    .finally(() => mongoose.disconnect)