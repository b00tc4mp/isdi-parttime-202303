import {
  validateEmail,
  validateName,
  validatePassword,
  validateUrl,
  validateId,
} from "./validators.js";
import { users } from "./data.js";

export function registerUser(name, email, password, repeatPassword) {
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

export function authenticateUser(email, password) {
  validateEmail(email);
  validatePassword(password);

  const foundUser = findUserByEmail(email);

  if (!foundUser) throw new Error("User not found 😥", { cause: "userError" });

  if (foundUser.password !== password) {
    throw new Error("Wrong password 😥", { cause: "userError" });
  }

  return foundUser.id;
}

export function retrieveUser(userId) {
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

export function changePassword(
  userId,
  password,
  newPassword,
  newPasswordConfirm
) {
  validateId(userId, "User ID");
  validatePassword(password);
  validatePassword(newPassword, "New password");
  validatePassword(password);

  let foundUser = findUserById(userId);

  if (!foundUser) throw new Error("User not found 😥", { cause: "userError" });
  if (password !== foundUser.password)
    throw new Error("Wrong password 😥", { cause: "userError" });
  if (newPassword !== newPasswordConfirm)
    throw new Error("New passwords do not match 😥", { cause: "userError" });
  if (newPassword === password)
    throw new Error("Your new password matches the current one 😥", {
      cause: "userError",
    });
  if (!newPasswordConfirm.length)
    throw new Error("You have not confirm your new password 😥", {
      cause: "userError",
    });
  if (newPassword.length < 8)
    throw new Error("Your password does not have 8 characters 😥", {
      cause: "userError",
    });

  foundUser.password = newPassword;
}

export function updateAvatar(userId, url) {
  validateId(userId, "User ID");
  validateUrl(url, "Avatar url");

  let foundUser = findUserById(userId);

  if (!foundUser) throw new Error("User not found 😥", { cause: "userError" });

  foundUser.avatar = url;
}

// helpers

function findUserByEmail(email) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === email) {
      return user;
    }
  }
}

function findUserById(userId) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.id === userId) {
      return user;
    }
  }
}
