function findUserByEmail(email) {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.email === email) {
      return user;
    }
  }
}

function registerUser(name, email, password, repeatPassword) {
  if (typeof name !== "string") throw new Error("Name is not a string 😥");
  if (!name.length) throw new Error("Name is empty 😥");
  if (typeof email !== "string") throw new Error("Email is not a string 😥");
  if (!email.length) throw new Error("Email is empty 😥");
  if (typeof password !== "string")
    throw new Error("Password is not a string 😥");
  if (!password.length) throw new Error("Password is empty 😥");
  if (password.length < 8)
    throw new Error("Your password must have at least 8 characters 😥");
  if (password !== repeatPassword) throw new Error("Passwords do not match 😥");

  let foundUser = findUserByEmail(email);

  if (foundUser)
    throw new Error("You are already registered! Please login! 😅");

  users.push({
    name: name,
    email: email,
    password: password,
  });
}

function authenticateUser(email, password) {
  if (typeof email !== "string") throw new Error("Email is not a string 😥");
  if (!email.length) throw new Error("Email is empty 😥");
  if (typeof password !== "string")
    throw new Error("Password is not a string 😥");
  if (!password.length) throw new Error("Password is empty 😥");

  let foundUser = findUserByEmail(email);

  if (!foundUser) throw new Error("User not found 😥");

  if (foundUser.password !== password) {
    throw new Error("Wrong password 😥");
  }
}

function retrieveUser(email) {
  if (typeof email !== "string") throw new Error("Email is not a string 😥");
  if (!email.length) throw new Error("Email is empty 😥");

  let foundUser = findUserByEmail(email);

  if (!foundUser) throw new Error("User not found 😥");

  let user = {
    name: foundUser.name,
    email: foundUser.email,
  };

  return user;
}

function changePassword(email, password, newPassword, newPasswordConfirm) {
  let foundUser = findUserByEmail(email);

  if (!foundUser) throw new Error("User not found 😥");
  if (password !== foundUser.password) throw new Error("Wrong password 😥");
  if (newPassword !== newPasswordConfirm)
    throw new Error("New passwords do not match 😥");
  if (newPassword === password)
    throw new Error("New passwords cannot be the same 😥");
  if (!password.length) throw new Error("Password is empty 😥");
  if (!newPassword.length) throw new Error("New Password is empty 😥");
  if (!newPasswordConfirm.length)
    throw new Error("You must confirm your new password 😥");
  if (newPassword.length < 8)
    throw new Error("Your new password must have at least 8 characters 😥");

  foundUser.password = newPassword;
}
