import { findPostById, findUserById } from '../data/data-managers';
import { saveUser } from '../data/data';
import { validatePostExists } from '../data/validators-posts';
import { validateUserID } from '../data/validators-users';

export const toggleFav = (postId, userId, callback) => {
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
        const index = user.favs.indexOf(postId);
        index < 0 ? user.favs.push(postId) : user.favs.splice(index, 1);
        
        saveUser(user, () => callback(null));
    })
})
}