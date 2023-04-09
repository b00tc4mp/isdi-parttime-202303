import { users } from "../../data.js";

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
