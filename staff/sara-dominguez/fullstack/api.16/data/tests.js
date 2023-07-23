const mongoose = require('mongoose')


const { User, Post } = require('./models')

mongoose.connect('mongodb://127.0.0.1:27017/data')
    // .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    // .then(() => {
    //     return User.create({ name: 'Usuario M', email: 'usuariom@email.com', password: 'Aa-1234' })
    // })
    // .then(user => {
    //     return Post.create({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })
    // })

    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => {
        const user = new User({ name: 'Usuario Mongoose', email: 'usuariom@email.com', password: 'Aa-1234' })
        const post = new Post({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })

        post.author = user.id

        user.favs.push(post.id)
        post.likes.push(user.id)

        return Promise.all([user.save(), post.save()])
    })


    .catch(error => {
        console.log(error)
    })
    .finally(() => mongoose.disconnect())
