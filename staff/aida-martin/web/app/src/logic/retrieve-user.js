import { validateId } from "./helpers/validators.js";
import { findUserById } from "./helpers/data-managers.js";

export default function retrieveUser(userId) {
  validateId(userId, "User ID");

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error("User not found 😥", { cause: "userError" });

  const user = {
    name: foundUser.name,
  };

  if (foundUser.avatar) {
    user.avatar = foundUser.avatar;
  }

  return user;
}
