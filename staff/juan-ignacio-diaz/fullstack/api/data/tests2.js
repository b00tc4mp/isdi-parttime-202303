const mongoose = require('mongoose')

const { User, Post } = require('./models')

console.log('a')

mongoose.connect('mongodb://127.0.0.1:27017/data-test')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    // .then(() => {
    //     return User.create({ name: 'Pepito Grillo\t\n', email: 'pepita@grillo.com', password: '123123123' })
    // })
    // .then(user => {
    //     return Post.create({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })
    // })
    .then(() => {
        const user = new User({ name: 'Pepito Grillo\t\n', email: 'pepita@grillo.com', password: '123123123' })
        const post = new Post({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })

        // post.author = user.id

        user.favs.push(post.id)
        post.likes.push(user.id)

        return Promise.all([user.save(), post.save()])
    })
    .then(([user, post]) => {
        // ...
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => mongoose.disconnect())