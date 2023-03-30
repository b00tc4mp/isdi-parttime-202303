var users = []

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123',
    avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123',
    avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123',
    avatar: 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg'
})

const findUserByEmail = (email)=> {
  let user;

  for (let i = 0; i < users.length; i++) {
    
    if (users[i].email === email) {
      user = users[i];
      return user;
    }
  }
}
