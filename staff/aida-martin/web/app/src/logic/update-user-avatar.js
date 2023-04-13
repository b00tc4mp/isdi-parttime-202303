import { validateId, validateUrl } from "./helpers/validators.js";
import { findUserById } from "./helpers/data-managers.js";
import { saveUsers } from "../data.js";

export default function updateAvatar(userId, url) {
  validateId(userId, "User ID");
  validateUrl(url, "Avatar url");

  let user = findUserById(userId);

  if (!user) throw new Error("User not found 😥", { cause: "userError" });

  user.avatar = url;

  saveUsers();
}
