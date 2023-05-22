import { loadPosts, loadUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateUserID } from '../data/validators-users';

/**

 */
export const retrieveFavoritePosts = (userId, callback) => {
  //validateUserID(userId);
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
