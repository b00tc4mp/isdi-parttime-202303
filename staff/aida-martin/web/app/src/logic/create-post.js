import { validateId, validateUrl, validateText } from "./helpers/validators.js";
import { findUserById } from "./helpers/data-managers.js";
import { posts, savePosts } from "../data.js";

export default function createPost(userId, image, text) {
  validateId(userId, "User ID");
  validateUrl(image, "Image URL");
  validateText(text);

  const user = findUserById(userId);

  if (!user) throw new Error("User not found 😥", { cause: "userError" });

  let id = "post-1";

  const lastPost = posts[posts.length - 1];

  if (lastPost) {
    id = "post-" + (parseInt(lastPost.id.slice(5)) + 1);
  }

  const post = {
    id,
    name: user.name,
    avatar: user.avatar,
    author: userId,
    image,
    text,
    date: new Date(),
    likes,
  };

  posts.push(post);

  savePosts();
}
