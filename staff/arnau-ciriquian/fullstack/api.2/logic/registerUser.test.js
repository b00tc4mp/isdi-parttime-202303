import registerUser from "./registerUser.js"

registerUser('Ona', 'ona@ciriquian.com', 'Ona1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})