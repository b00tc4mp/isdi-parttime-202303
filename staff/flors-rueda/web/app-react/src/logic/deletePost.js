import { validateUserID, validateUserPassword } from '../data/validators-users'
import { validatePostAuthor, validatePostExists } from '../data/validators-posts'
import { loadPosts, savePosts } from '../data/data';
import { findPostById, findUserById } from '../data/data-managers';

export const deletePost = (userId, postId, callback) => {
    /*validateUserID(userId);
    validatePostExists(postId);
    validatePostAuthor(postId, userId);
    validateUserPassword(userId, password);*/

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('authentication failed'));
            return;
        }
        findPostById(postId, post => {
            if (!post || post.author !== userId) {
                callback(new Error('post authentication failed'));
                return;
            }
            loadPosts(posts => {
                const index = posts.findIndex(post => post.id === postId)

                posts.splice(index, 1)

                savePosts(posts, () => callback(null))
            })
        })
    })
}