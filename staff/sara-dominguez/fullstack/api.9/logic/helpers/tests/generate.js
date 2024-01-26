const { ObjectId } = require('mongodb')


module.exports = {
    user: () => ({
        name: `name-${Math.round(Math.random() * 100)}`,
        email: `Em${Math.round(Math.random() * 100)}@gmail.com`,
        password: `Passw#${Math.round(Math.random() * 100)}`,

    }),

    post: userId => ({
        author: userId,
        image: `image-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
        likes: []
    })
}





//VERSION CON CALLBACKS
// module.exports = {
//     user: () => ({
//         id: `user-${Math.random()}`,
//         name: `name-${Math.round(Math.random() * 100)}`,
//         email: `Em${Math.round(Math.random() * 100)}@gmail.com`,
//         password: `Passw#${Math.round(Math.random() * 100)}`
//     }),

//     post: userId => ({
//         id: `post-${Math.random()}`,
//         author: userId,
//         image: `image-${Math.random()}`,
//         text: `text-${Math.random()}`,
//         date: new Date,
//         likes: []
//     })
// }