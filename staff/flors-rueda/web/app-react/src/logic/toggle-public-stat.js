import { savePost } from '../data/data';
import { findPostById, findUserById } from '../data/data-managers';
import { validateCallback, validateId } from '../data/validators';

export const togglePublicStat = (postId, userId, callback) => {
  validateId(postId);
  validateId(userId);
  validateCallback(callback);

  findUserById(userId, user => {
    if (!user) {
        callback(new Error(`user with id ${userId} not found`));
        return;
    }

    findPostById(postId, post => {
        if (!post) {
            callback(new Error(`post with id ${postId} not found`));
            return;
        }
        post.isPublic = !post.isPublic

        savePost(post, () => callback(null));
    })
})
}