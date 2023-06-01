const registerUser = require('./registerUser')

registerUser('Iván', 'canutosorianoivan@gamil.com', '123123123', '123123123', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('User registered.');
})