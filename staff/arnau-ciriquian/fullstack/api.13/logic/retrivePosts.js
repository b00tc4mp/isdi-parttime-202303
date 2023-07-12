const context = require('./context')
const { validators: { validateId } } = require('com')

module.exports = userId => {
    validateId(userId, 'user id')

    const { users, posts } = context

    return Promise.all([
        // aplicar moongose primer
    ])

    /*return users.findOne({ _id: userId})
        .then(user => {
            if (!user) {throw new Error('User not found')}

            return Promise.all([users.find().toArray(), posts.find().toArray()])
                .then(([users, posts]) => {
                    posts.forEach(post => {
                        post.favs = user.favs.includes(post._id.toString())

                        const _user = users.find(user => user._id.toString() === post.author.toString())

                        //arreglar nom i favs del post (new fix 20230627 2120) -> comprovar amb insomnia que torna
                        
                        post.author = {
                            id: _user._id.toString(),
                            username: _user.name,
                            avatar: _user.avatar
                        }
                    })
                    return posts
                })
        })*/
}