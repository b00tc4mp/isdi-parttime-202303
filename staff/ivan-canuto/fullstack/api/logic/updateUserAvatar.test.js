const updateUserAvatar = require('./updateUserAvatar')

updateUserAvatar('user-1', 'https://img.freepik.com/iconos-gratis/icono-perfil-usuario_318-33925.jpg', '12312312', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Avatar changed')
})