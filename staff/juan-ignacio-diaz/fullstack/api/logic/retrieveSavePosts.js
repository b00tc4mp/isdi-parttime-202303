const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId) => {
    validateId(userId, 'user id')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return posts.find({_id: {$in: user.favs.map(fav => new ObjectId(fav))}}).toArray()
                .then(posts => {
                    const authors = posts.reduce((authors, { author }) => authors.add(author.toString()), new Set)

                    return users.find({ _id: { $in: Array.from(authors).map(id => new ObjectId(id)) } }).toArray()
                        .then(users => {

                            posts.forEach(post => {
                                post.id = post._id.toString()
                                post.fav = user.favs.some(fav => fav.toString() === post.id)
                                post.date = new Date(post.date)
                                post.dateLastModified = new Date(post.dateLastModified)
                
                                const author = users.find(user => user._id.toString() === post.author)
            
                                if (author)
                                    post.author = {
                                        id: author._id,
                                        name: author.name,
                                        avatar: author.avatar
                                    }                                   
                            }) 
                            return posts
                        })                 
                })
    })
}