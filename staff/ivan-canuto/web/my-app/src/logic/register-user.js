
export const registerUser = (registerName, registerEmail, registerPassword, repeatedPassword)=>{
  
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
