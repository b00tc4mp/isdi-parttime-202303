const deleteAccount = require("./deleteAccount.js")

deleteAccount('user-2', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user deleted')
})