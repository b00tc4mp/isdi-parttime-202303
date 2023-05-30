import { loadPosts, loadUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId } from '../data/validators';

/**
 * Retrieve's all the posts and its data
 * 
 * @param {string} userId The user logged id
 * @param {function} callback Function that controls the errors
 * 
 * @returns an array of posts object
*/
export const retrievePosts = (userId, callback) => {
  validateId(userId);
  validateCallback(callback);
  
  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`user with id ${userId} not found`));
      return;
    }
    loadPosts(posts => {
      loadUsers(users => {
        posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
        let _posts = [];
        posts.forEach(post => {
          if(post.isPublic || userId === post.author) {
            post.isFav = user.favs.includes(post.id);

            const _user = users.find(user => user.id === post.author);
  
            post.author = {
              id: _user.id,
              name: _user.name,
              username: _user.username,
              avatar: _user.avatar
            }
          _posts.push(post)
          }

        })

        callback(null, _posts);
      })
    })
  })
}