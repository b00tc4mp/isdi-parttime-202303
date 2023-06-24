const { validators: { validateId } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId) => {
    validateId(userId, 'user id')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return posts.find({ lock: false}).toArray() //, {lock: true , author: userId})
                .then(tmpPosts => {
                    if (tmpPosts) {
                        tmpPosts.forEach(post => {
                           //post.fav = user.favs.includes(post.id)
                            post.date = new Date(post.date)
                            post.dateLastModified = new Date(post.dateLastModified)
            
                            return users.findOne({ id: new ObjectId(post.author) })
                                .then(author => {            
                                    if (author)
                                        post.author = {
                                            id: author.id,
                                            name: author.name,
                                            avatar: author.avatar
                                        }   
                                    })
                        })  
                    }

                    return tmpPosts
                })
        })
}