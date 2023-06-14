const registerUser = require('./registerUser.js');

registerUser('Mikel C.', 'mikelcabezas@gmail.com', '123123123', error => {
    // registerUser('Norah D.', 'mikelcabezas@icloud.com', '123123123', error => {
    if (error) {
        console.error(error)

        return
    }


    console.log('user registered')
})