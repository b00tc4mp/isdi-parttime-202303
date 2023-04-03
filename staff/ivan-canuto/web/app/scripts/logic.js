var user;

const body = document.querySelector('.spa-page')
const alert = document.createElement('div');
alert.classList.add('alert');

const createAlert = (content)=> {
  body.appendChild(alert)
  alert.textContent = content;
  setTimeout(()=>{
    alert.remove()
  },1500)
}

const registerUser = (registerName, registerEmail, registerPassword, repeatedPassword)=>{
  
  validateName(registerName)
  validateEmail(registerEmail)
  validatePassword(registerPassword)
  validatePassword(repeatedPassword, 'password confirm')

  for (let i = 0; i < users.length; i++) {
    if (registerEmail === users[i].email) throw new Error('The email entered already belongs to an existing user.');
  };

  if (registerPassword.length < 6) throw new Error(registerPage,'The password must contain at least 6 letters.');
  
  if (registerPassword !== repeatedPassword) throw new Error('The passwords entered are not the same.');

  users.push({
    name: registerName,
    email: registerEmail,
    password: registerPassword,
    avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
  });
}

const authenticateUser = (loginEmail, loginPassword)=>{
  
  validateEmail(loginEmail)
  validatePassword(loginPassword)

  let user = findUserByEmail(loginEmail);
  if(!user) throw new Error('User not found.')
  if(loginPassword !== user.password) throw new Error('Incorrect password.')

}

const retrieveUser = (email)=>{
  if(!email.length) throw new Error("The email doesn't exist.")
  if(typeof email !== 'string') throw new Error("Email is not a string.")

  let user = findUserByEmail(email)

  if(!user) throw new Error("User not found.")

  user = {
    name: user.name,
    email: user.email,
    avatar: user.avatar
  }
  return user;
}

const changePassword = (email, oldPassword, newPassword, newPasswordRepeated)=>{
  
  validatePassword(oldPassword, 'old password')
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordRepeated, 'new password confirm')

  let user = findUserByEmail(email);
  if (oldPassword !== user.password)  throw new Error('The password entered is not the current user password.');

  if (newPassword.length < 6 || newPasswordRepeated.length < 6)  throw new Error('The new password entered is too short.')
  
  if (newPassword !== newPasswordRepeated)  throw new Error('The new two passwords entered are not the same.');
  
  window.alert('The password has been changed successfully.')
  user.password = newPassword;
}

const changeAvatar = (email, newAvatarUrl, password)=>{
  
  validateAvatarUrl(newAvatarUrl)
  validatePassword(password)
  
  let user = findUserByEmail(email)
  if(!user) throw new Error('User not found.')
  if (newAvatarUrl === user.avatar) throw new Error('The url entered is the same as the current url avatar image.')
  if (password !== user.password)  throw new Error('The password entered is not the current user password.');

  window.alert('The avatar image has been changed successfully.')
  user.avatar = newAvatarUrl
  profileImage.src = user.avatar
}

