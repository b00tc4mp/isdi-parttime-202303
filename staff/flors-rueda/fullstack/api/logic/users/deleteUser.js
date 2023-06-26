const { validators: { validateId, validatePassword } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

//TODO use find one and delete method!

module.exports = function deleteUser(userAuth, password, callback) {
    validateId(userAuth);
    validatePassword(password);

    module.exports = function deleteUser(userAuth, password) {
        if (error) {
            callback(error);
            return;
        }

        const { users } = context;
        const { posts } = context;

        return users.findOne({ _id: new ObjectId(userAuth) }).then((user) => {
            if (!user || user.password !== password) throw new Error('authentication failed');

            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                const index = post.likes.findIndex(id => id === userAuth);
                if (index > -1) {
                    post.likes.splice(index, 1);
                }
                if (post.author === userAuth) {
                    posts.splice(i, 1);
                    i--;
                }
            }

            const userIndex = users.findIndex(user => user.id === userAuth);
            users.splice(userIndex, 1);



        });

    }
};
