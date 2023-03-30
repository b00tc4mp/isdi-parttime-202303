//
findUserByEmail = (email) => {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.email === email) {
      foundUser = user;

      break;
    }
  }

  return foundUser;
};

const registerUser = (name, email, password) => {
  if (typeof name !== "string") throw new Error("name is not a string");
  if (!name.length) throw new Error("name is empty");
  if (typeof email !== "string") throw new Error("email is not an string");
  if (!email.length) throw new Error("email is empty");
  if (typeof password !== "string") throw new Error("password is not a string");
  if (!password.length) throw new Error("password is empty");

  const foundUser = findUserByEmail(email);

  if (foundUser) throw new Error("user already exists");

  users.push({
    email: email,
    info: {
      name: name,
      password: password,
    },
  });

  return foundUser;
};

const authenticateUser = (email, password) => {
  if (typeof email !== "string") throw new Error("email is not an string");
  if (!email.length) throw new Error("email is empty");
  if (typeof password !== "string") throw new Error("password is not a string");
  if (!password.length) throw new Error("password is empty");

  const foundUser = findUserByEmail(email);

  if (!foundUser) throw new Error("User doesnt exist");
  if (foundUser.info.password !== password)
    throw new Error("Password incorrect");

  return foundUser;
};

const updateUserPassword = (
  email,
  password,
  newPassword,
  newPasswordConfirm
) => {
  // TODO add more input validation

  const foundUser = findUserByEmail(email);
  if (!foundUser) throw new Error("User doesn't exists");

  if (password !== foundUser.info.password)
    throw new Error("User password doesn't match");

  if (newPassword !== newPasswordConfirm)
    throw new Error("New password doesn't match with password confirm");

  if (newPassword === password) throw new Error("New password is equal to old");
  foundUser.password = newPassword;

  alert("Your password has been updated");
};
