const { readFile, writeFile } = require('fs')

module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {

    if (newPassword === password) {
        callback(new Error('La nueva contraseña es igual que la anterior. Debe cambiarla.'));
        return
    }

    if (newPassword !== newPasswordConfirm) {
        callback(new Error('La nueva contraseña y su confirmación no coinciden. Revíselo.'));
        return
    }

    readFile('../data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error)

            return
        }

        const users = JSON.parse(json);

        const user = users.find(user => user.id === userId)

        if (user.password !== password) {
            callback(new Error('La contraseña del usuario no coincide. Revísela'));
            return
        }

        user.password = newPassword;

        json = JSON.stringify(users)


        writeFile('../data/users.json', json, 'utf8', error => {
            if (error) {
                callback(error)

                return
            }

            callback(null);
        })

        console.log('Contraseña cambiada');

    })
}