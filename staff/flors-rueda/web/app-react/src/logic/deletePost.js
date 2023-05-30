import { loadPosts, savePosts } from '../data/data';
import { findPostById, findUserById } from '../data/data-managers';
import { validateId, validateCallback } from '../data/validators';

export const deletePost = (userId, postId, callback) => {   
    validateId(userId);
    validateId(postId);
    validateCallback(callback);

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