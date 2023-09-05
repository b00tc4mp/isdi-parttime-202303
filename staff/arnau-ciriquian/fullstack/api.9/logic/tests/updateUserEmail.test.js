const updateUserEmail = require("./updateUserEmail.js")

updateUserEmail('user-3', 'onilla@ciriquian.com', 'oni@ciriquian.com', 'oni@ciriquian.com', 'Onilla1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('email updated')
})