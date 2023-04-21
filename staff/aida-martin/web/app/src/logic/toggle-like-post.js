import { validateId } from "./helpers/validators.js";
import { findPostById, findUserById } from "./helpers/data-managers";
import { savePosts } from "../data.js";

export default function toggleLikePost(userId, postId) {
  validateId(userId, "User ID");
  validateId(postId, "Post ID");

  const user = findUserById(userId);

  if (!user) throw new Error("User not found 😥");

  const post = findPostById(postId);

  if (!post) throw new Error("Post not found 😥");

  if (!post.likes) {
    post.likes = [userId];
  } else {
    const index = post.likes.indexOf(userId);

    if (index < 0) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);

      if (!post.likes.length) {
        delete post.likes;
      }
    }
  }

  savePosts();
}
