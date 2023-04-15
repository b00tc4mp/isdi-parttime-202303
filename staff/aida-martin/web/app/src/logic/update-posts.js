import { validateId, validateUrl, validateText } from "./helpers/validators.js";
import { findUserById, findPostById } from "./helpers/data-managers.js";
import { savePosts } from "../data.js";

export default function updatePosts(userId, postId, image, text) {
  validateId(userId, "User ID");
  validateUrl(image, "Image URL");
  validateText(text, "Text");

  let user = findUserById(userId);
  let post = findPostById(postId);

  if (!user) throw new Error("User not found 😥", { cause: "userError" });

  post.image = image;
  post.text = text;

  savePosts();
}
