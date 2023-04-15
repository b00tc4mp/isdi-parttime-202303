import { users, posts } from "../../data.js";

export function findUserByEmail(email) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === email) {
      return user;
    }
  }
}

export function findUserById(userId) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.id === userId) {
      return user;
    }
  }
}

export function findPostById(postId) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    if (post.id === postId) {
      return post;
    }
  }
}
