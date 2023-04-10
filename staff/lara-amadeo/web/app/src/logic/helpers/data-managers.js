import { users } from "../../data.js"


export const retrieveUser = (userId) => {
    let foundUser =  findUserbyId(userId)

    if(!foundUser) throw new Error ('User not found')

    else {
        const user = {
            id: foundUser.id,
            name: foundUser.username,
            avatar: foundUser.avatar
        }
        return user
    }
}

export const findUserbyEmail = (email) => {
    return users.find(user => user.email === email)
 }

export const findUserbyId = (userId) => {
    return users.find(user => user.id === userId)
 }