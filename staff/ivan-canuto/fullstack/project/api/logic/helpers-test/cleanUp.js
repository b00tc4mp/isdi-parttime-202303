const { User, Post, Conversation, Suggestion } = require('../../data/models')

module. exports = async () => {

    // in series
    // return users.deleteMany()
    //     .then(() => posts.deleteMany())

    // in parallel (faster)
    // return Promise.all([
    //     User.deleteMany(),
    //     Post.deleteMany()
    // ])

    await User.deleteMany()
    await Post.deleteMany()
    await Conversation.deleteMany()
    await Suggestion.deleteMany()
}