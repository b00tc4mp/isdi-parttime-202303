function registerUser(name, email, password) {
  if (!name.length) throw new Error(' Name field is empty.');
  if (typeof name !== 'string') throw new Error('Name is not a string.')
  if (!email.length) throw new Error('Email field is empty.')
  if (typeof email !== 'string') throw new Error('Eamil is not a string.')
  if (!email.includes('@')) throw new Error("Email doesn't contain a '@'.")
  if (!newEmail.includes('.')) throw new Error("Email doesn't contain a'.', try to put a dot whithin the domain part.")
  if (!password.length) throw new Error('Password field is empty.')
  if (typeof password !== 'string') throw new Error('Password is not a string.')
  if (password.length < 6) throw new Error('Password is too short, try one with at least 6 letter.')

  // 6 errores
    // if (typeof name !== 'string') throw new Error('name is not a string')
    // if (!name.length) throw new Error('name is empty')
    // if (typeof email !== 'string') throw new Error('email is not an string')
    // if (!email.length) throw new Error('email is empty')
    // if (typeof password !== 'string') throw new Error('password is not a string')
    // if (!password.length) throw new Error('password is empty')
  // TODO add more input validation

  var foundUser = findUserByEmail(email)

  if (foundUser) throw new Error('User already exists.')

  users.push({
      name: name,
      email: email,
      password: password
  })
}

function authenticateUser(email, password) {
  if (!email.length) throw new Error('Email field is empty.')
  if (typeof email !== 'string') throw new Error('Eamil is not a string.')
  if (!password.length) throw new Error('Password field is empty.')
  if (typeof password !== 'string') throw new Error('Password is not a string.')
  // 4 errores
  // TODO add more input validation

  var foundUser = findUserByEmail(email)

  if (!foundUser) throw new Error('User not found.')
  if (foundUser.password !== password) throw new Error('Password is incorrect.')
  
}

function retrieveUser(email) {
  if (!email.length) throw new Error("This email doesn't exist.")
  if (typeof email !== 'string') throw new Error('Eamil is not a string.')
  // 2 errores

  var foundUser = findUserByEmail(email)

  if (!foundUser) throw new Error('User not found.')

  var user = {
      name: foundUser.name,
      email: foundUser.email
  }

  return user
}

function updateUserEmail(email, newEmail, newEmailConfirm) {
  var foundUser = findUserByEmail(email)

  if (!foundUser) throw new Error('User not found')
  if (!email.length) throw new Error('Email field is empty.')
  if (typeof email!=='string') throw new Error('Email is not a string.')
  if (email !== foundUser.email) throw new Error('The email is incorrect');

  if (!newEmail.length) throw new Error('New email field is empty.')
  if (typeof newEmail!=='string') throw new Error('New email is not a string.')
  if (!newEmailConfirm.length) throw new Error('New email confirmation field is empty.')
  if (typeof newEmailConfirm!=='string') throw new Error('New email confirmation is not a string.')
  if (!newEmail.includes('@')) throw new Error('New email does not include a "@", try one with at least 6 letter.')
  if (!newEmail.includes('.')) throw new Error("Email doesn't contain a'.', try to put a dot whithin the domain part.")
  if (newEmail === email) throw new Error('New email cannot be the same as the old email.')
  if (newEmail !== newEmailConfirm) throw new Error('New emails do not match.')

  // TODO add more input validation

  foundUser.email = newEmail

  return true
}

function updateUserPassword(email, password, newPassword, newPasswordConfirm) {
  var foundUser = findUserByEmail(email)

  if (!foundUser) throw new Error('User not found')
  if (!password.length) throw new Error('Password field is empty.')
  if (typeof password!=='string') throw new Error('Password is not a string.')
  if (password !== foundUser.password) throw new Error('The password is incorrect');

  if (!newPassword.length) throw new Error('New password field is empty.')
  if (typeof newPassword!=='string') throw new Error('New password is not a string.')
  if (!newPasswordConfirm.length) throw new Error('New password confirmation field is empty.')
  if (typeof newPasswordConfirm!=='string') throw new Error('New password confirmation is not a string.')
  if (newPassword.length < 6) throw new Error('New password is too short, try one with at least 6 letter.');
  if (newPassword === password) throw new Error('New password cannot be the same as the old password.')
  if (newPassword !== newPasswordConfirm) throw new Error('New passwords do not match.')

  // TODO add more input validation

  foundUser.password = newPassword

  return true
}
