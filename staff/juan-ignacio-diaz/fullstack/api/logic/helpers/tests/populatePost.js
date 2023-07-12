const { Post } = require('../../../data/models')

module.exports = (post) => {
    return Post.create({
        author: new ObjectId(post.author),
        image: post.image,
        text: post.text,
        date: post.date,
        dateLastModified: post.dateLastModified,
        likes: post.likes,
        lock: post.lock,
        price: post.price
    })
        .then(tmpPost => {
            post.id = tmpPost._id.toString()

            return post
        })
}