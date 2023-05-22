import { loadPosts } from '../data/data';
import { findUserById } from '../data/data-managers';

import { validateUserID } from '../data/validators-users';

/**
TODO: add documentation to all logic functions
 */
export const retrieveUserPosts = (userId, callback) => {
  //validateUserID(userId);
  findUserById(userId, user => {
    if (!user) {
      callback(new Error(`user with id ${userId} not found`));
      return;
    }
    loadPosts(posts => {
      let _posts = [];
        posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
        posts.forEach(post => {
          post.isFav = user.favs.includes(post.id);
          if(post.author === user.id) _posts.push(post);
        })
        callback(null, _posts)
    })
  })
}