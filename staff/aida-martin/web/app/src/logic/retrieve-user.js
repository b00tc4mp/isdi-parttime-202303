import { validateId } from "./helpers/validators.js";
import { findUserById } from "./helpers/data-managers.js";

export default function retrieveUser(userId) {
  validateId(userId, "User ID");

  let user = findUserById(userId);

  if (!user) throw new Error("User not found 😥", { cause: "userError" });

  user = {
    name: user.name.split(" ")[0],
    avatar: user.avatar,
  };

  if (user.avatar) {
    user.avatar = user.avatar;
  }

  return user;
}
