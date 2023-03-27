var user;

const alert = document.createElement('div');
alert.classList.add('alert');

const createAlert = (page, content)=> {
  page.appendChild(alert)
  alert.textContent = content;
  setTimeout(()=>{
    alert.remove()
  },3000)
}

const registerUser = (registerName, registerEmail, registerPassword, repeatedPassword)=>{
  
  if (!registerName || !registerEmail || !registerPassword || !repeatedPassword) {
    console.log(registerName, registerEmail, registerPassword,repeatedPassword);
    createAlert(registerPage, 'Please, fill in all the fields.');
    return false;
  }

  for (let i = 0; i < users.length; i++) {
    if (registerEmail === users[i].email) {      
      createAlert(registerPage, 'The email entered already belongs to an existing user.');
      return false;
    } 
  };

  if (registerPassword.length < 6) {
    createAlert(registerPage,'The password must contain at least 6 letters.');
    return false;
  }
  if (registerPassword !== repeatedPassword) {
    console.log(registerPassword, repeatedPassword);
    createAlert(registerPage, 'The passwords entered are not the same.');
    return false;
  }

  users.push({
    name: registerName,
    email: registerEmail,
    password: registerPassword,
  });
  return true;
}

const authenticateUser = (loginEmail, loginPassword)=>{

  const headerTitle = document.querySelector('.header__title');

  if (!loginEmail || !loginPassword) {
    createAlert(loginPage, 'Please, fill in all the fields.');
    return false;
  } 
  
  let foundUser = false;
  for (let i = 0; i < users.length; i++) {
    if (loginEmail === users[i].email && loginPassword === users[i].password) {
      user = users[i];
      foundUser = true; 
    }
  };

  if (!foundUser) { 
    createAlert(loginPage, 'Wrong email or password.');
    return false;
  } else {
    headerTitle.textContent = `Welcome ${user.name}!`
    return true;
  }
}

const changePassword = (oldPassword, newPassword, newPasswordRepeated)=>{
  
  if (!oldPassword || !newPassword || !newPasswordRepeated) return createAlert(changePasswordPage, 'Please, fill in all the fields.');

  if (oldPassword !== user.password) return createAlert(changePasswordPage, 'The password entered is not the current user password.');

  if (newPassword.length < 6 || newPasswordRepeated.length < 6) return createAlert(changePasswordPage, 'The new password entered must contain at least 6 letters.')
  
  if (newPassword !== newPasswordRepeated) return createAlert(changePasswordPage, 'The new two passwords entered are not the same.');
  
  window.alert('The password has been changed successfully.')
  user.password = newPassword;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email) {
      users.splice(i, 1, user);
      return true;
    }
  }
}