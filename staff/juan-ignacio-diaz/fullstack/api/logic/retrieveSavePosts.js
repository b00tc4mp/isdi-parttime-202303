const { validators: { validateId,  } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId) => {
    validateId(userId, 'user id')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            const promises = []

            promises.push(posts.find({}).toArray())         
            promises.push(users.find({}).toArray())

            return Promise.all(promises)
                .then(([tmpPosts, tmpUsers]) => {
                    if (tmpPosts) {
                        tmpPosts = tmpPosts.filter(post => (user.favs.includes(post.id)))   

                        tmpPosts.forEach(post => {
                            post.id = post._id.toString()
                            post.fav = user.favs.includes(post._id.toString())
                            post.date = new Date(post.date)
                            post.dateLastModified = new Date(post.dateLastModified)
            
                            const author = tmpUsers.find(user => user._id.toString() === post.author)
          
                            if (author)
                                post.author = {
                                    id: author._id,
                                    name: author.name,
                                    avatar: author.avatar
                                }                                   
                        }) 
                        return tmpPosts
                    }                   
            })
        })
}



