const updateUserPassword = require('./updateUserPassword')

updateUserPassword('user-1', '123123123', '234234234', '234234234', (error) => {
  if(error) {
    console.error(error)

    return
  }

  console.log('Password changed.')
})