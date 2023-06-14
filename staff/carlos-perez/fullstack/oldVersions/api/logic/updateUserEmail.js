const { readFile, writeFile } = require('fs')
const { validators: { validateId, validateEmail, validateCallback } } = require('com');

module.exports = function updateUserEmail(userId, email, newEmail, newEmailConfirm, callback) {
    validateId(userId)
    validateEmail(email)
    validateEmail(newEmail)
    validateEmail(newEmailConfirm)
    validateCallback(callback)

    if (newEmail === email)
    {
        callback(new Error('El nuevo correo es igual que la anterior. Debe cambiarlo.'));
        return
    } 
    
    if (newEmail !== newEmailConfirm){
        callback(new Error('El nuevo correo y su confirmación no coinciden. Revíselo.'));
        return
    } 

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json);

        const user = users.find(user => user.id === userId)

        if(user.email!==email){
            callback(new Error('El correo dado no coincide con el correo asignado al usuario. Revíselo.'));
        return
        }

        user.email=newEmail;

        json = JSON.stringify(users)


        writeFile('./data/users.json', json, 'utf8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null);
        })

        console.log('Correo cambiado');

})
}