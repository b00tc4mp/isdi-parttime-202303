import { validateId, validateUrl } from "./helpers/validators.js";
import { findUserById } from "./helpers/data-managers.js";

export default function updateAvatar(userId, url) {
  validateId(userId, "User ID");
  validateUrl(url, "Avatar url");

  let foundUser = findUserById(userId);

  if (!foundUser) throw new Error("User not found 😥", { cause: "userError" });

  foundUser.avatar = url;
}
