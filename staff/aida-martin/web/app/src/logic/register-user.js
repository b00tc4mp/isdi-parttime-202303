import {
  validateName,
  validateEmail,
  validatePassword,
} from "./helpers/validators.js";
import { findUserByEmail } from "./helpers/data-managers.js";
import { users } from "../data.js";

export default function registerUser(name, email, password, repeatPassword) {
  validateName(name);
  validateEmail(email);
  validatePassword(password);

  const foundUser = findUserByEmail(email);

  if (foundUser)
    throw new Error("You are already registered! Please login! 😅", {
      cause: "userError",
    });

  if (password !== repeatPassword)
    throw new Error("Passwords do not match 😥", { cause: "userError" });

  let id = "user-1";

  const lastUser = users[users.length - 1];

  if (lastUser) {
    id = "user-" + (parseInt(lastUser.id.slice(5)) + 1);
  }

  users.push({
    id,
    name,
    email,
    password,
  });

  console.log(users);
}
