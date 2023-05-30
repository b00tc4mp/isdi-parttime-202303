import { loadPosts, loadUsers, savePosts, saveUsers } from '../data/data';
import { findUserById } from '../data/data-managers';
import { validateCallback, validateId, validatePassword } from '../data/validators';


export const deleteUser = (userId, password, callback) => {
  validateId(userId);
  validatePassword(password);
  validateCallback(callback);

  findUserById(userId, user => {
    if (!user || user.password !== password) {
      callback(new Error('authentication failed'));
      return;
    }
    loadPosts(posts => {
      for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const index = post.likes.findIndex((id) => id === userId);
        if (index > -1) {
          post.likes.splice(index, 1);
        }
        if (post.author === userId) {
          posts.splice(i, 1);
          i--;
        }
      }
      savePosts(posts, () => callback(null))
    })
    loadUsers(users => {
      const index = users.findIndex(user => user.id === userId)
      users.splice(index, 1)
      saveUsers(users, () => callback(null))
    })

  })
};