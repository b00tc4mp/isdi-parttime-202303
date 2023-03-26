function registerUser(name, email, password, repeatPassword) {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.email === email) {
      foundUser = user;

      break;
    }
  }

  if (!email || !name || !password || !repeatPassword || foundUser) {
    return false;
  }

  users.push({
    name: name,
    email: email,
    password: password,
  });

  return true;
}

function authenticateUser(email, password) {
  let foundUser;
  let match = false;

  for (let i = 0; i < users.length && match === false; i++) {
    let user = users[i];

    if (user.email === email) {
      foundUser = user;
      username = user.name;
      match = true;
    }
  }

  if (!foundUser || foundUser.password !== password) {
    return false;
  }

  return true;
}
