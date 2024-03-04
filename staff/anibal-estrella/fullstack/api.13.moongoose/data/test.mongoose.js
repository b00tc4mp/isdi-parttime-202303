const mongoose = require('mongoose')

const { User, Post } = require('./models')

mongoose.connect('mongodb://127.0.0.1:27017/data')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    .then(() => {
        const user = new User({ name: 'ma nu', email: 'manu@gmail.com', password: '123123123' })
        const post = new Post({ author: user.id, image: `https://picsum.photos/1500?random=${Math.floor(Math.random() * 999) + 1}`, text: 'Some cool text' })

        post.author = user.id

        user.favs.push(post.id)
        post.likes.push(user.id)

        return Promise.all([user.save(), post.save()])
    })
    .then((user, post) => {

    })
    .finally(() => mongoose.disconnect)
