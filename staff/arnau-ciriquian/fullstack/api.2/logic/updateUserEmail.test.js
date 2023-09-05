import updateUserEmail from "./updateUserEmail.js";

updateUserEmail('user-3', 'ona@ciriquian.com', 'onilla@ciriquian.com', 'onilla@ciriquian.com', 'Ona1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('email updated')
})