const { validators: { validateId, validatePostText } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function updatePost(newText, newPostImg, postId, userAuth) {
    validateId(postId);
    validateId(userAuth);
    validatePostText(newText);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userAuth) }).then((user) => {
        if (!user) throw new Error(`user with id ${userAuth} not found`);

        return posts.findOneAndUpdate({ _id: new ObjectId(postId) }, {
            $set: {
                text: newText,
                image: newPostImg,
                edited: edited.push(new Date())
            }
        }).then((post) => {
            if (!post) throw new Error(`post with id ${postId} not found`);
            if (post.author !== userAuth) throw new Error(`post with id ${postId} does not belong to user with id ${userAuth}`)
        })


    });
}
