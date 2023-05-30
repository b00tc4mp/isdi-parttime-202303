import { loadPosts } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId } from '../data/validators';


/**
TODO: add documentation to all logic functions
 */
export const retrieveUserPosts = (userId, userAuth, callback) => {
  validateId(userId);
  validateId(userAuth);
  validateCallback(callback);

  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`user with id ${userId} not found`));
      return;
    }
    loadPosts(posts => {
      let _posts = [];
        posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
        posts.forEach(post => {
          if(post.isPublic || userId === post.author){
            post.isFav = user.favs.includes(post.id);
            if(post.author === user.id) _posts.push(post);
          }
        })
        callback(null, _posts);
    })
  })
}