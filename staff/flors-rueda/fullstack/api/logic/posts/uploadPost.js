const { validators: { validateId, validatePostText }, helpers: { generateUUID } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function uploadPost(postImg, postText, userAuth) {
    validateId(userAuth);
    validatePostText(postText);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userAuth) }).then((user) => {
        if (!user) throw new Error(`user with id ${userAuth} not found`);

        return posts.insertOne({
            id: generateUUID(),
            author: userAuth,
            text: postText,
            image: postImg,
            date: new Date(Date.now()),
            likes: [],
            edited: [],
            isPublic: true
        })
    });
}
