import { findUserById, saveUser } from "../../data.js"
// import { pushUserDataToHeader } from "../../components/helpers/push-user-to-header.js"

export default function updateUserName(userId, newName, callback) {
    // const _users = users()
    const user = findUserById(userId, (error, user) => {
        if(!user) {
            callback(new Error ('user not found'))

            return
        }
        user.name = newName
            saveUser(user, () => callback(null))

    })
}