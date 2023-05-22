import { savePost } from '../data/data';
import { findPostById, findUserById } from '../data/data-managers';
import { validatePostExists } from '../data/validators-posts';
import { validateUserID } from '../data/validators-users';


export const toggleLike = (postId, userId, callback) => {
  //validateUserID(userId);
  //validatePostExists(postId);

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

        const index = post.likes.indexOf(userId);
        index < 0 ? post.likes.push(userId) : post.likes.splice(index, 1);

        savePost(post, () => callback(null));
    })
})
}
