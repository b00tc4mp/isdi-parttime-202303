import { loadPosts, loadUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId } from '../data/validators';

/**
 * Retrieve's the favorite posts and its data of an user
 * 
 * @param {string} userId The user id
 * @param {function} callback Function that controls the errors
 * 
 * @returns an array of posts object
*/
export const retrieveFavoritePosts = (userId, callback) => {
  validateId(userId);
  validateCallback(callback);
  
  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`user with id ${userId} not found`));
      return;
    }
    loadPosts(posts => {
      loadUsers(users => {
        let _posts = []
        posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
        posts.forEach(post => {
          if(user.favs.includes(post.id)){
            if(post.isPublic || userId === post.author){
              post.isFav = user.favs.includes(post.id);

              const _user = users.find(user => user.id === post.author);
              
              post.author = {
                id: _user.id,
                name: _user.name,
                username: _user.username,
                avatar: _user.avatar
              };
  
              _posts.push(post);
            }
          };
        })

        callback(null, _posts)
      })
    })
  })
}
