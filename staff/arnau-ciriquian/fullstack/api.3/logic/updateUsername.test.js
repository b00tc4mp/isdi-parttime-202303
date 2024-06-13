import updateUsername from "./updateUsername.js";

updateUsername('user-3', 'Ona', 'Onilla', 'Ona1', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('username updated')
})