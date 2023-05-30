import { loadPosts, loadUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId } from '../data/validators';

/**
 * Retrieve's all the post data
 * 
 * @param {string} userId The user logged id
 * @param {string} postId The id of the post to edit
 * 
 * @returns a post object = { id: string, author: string, text: string, image: string, date: date, edited: array of dates, likes: array of strings}
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