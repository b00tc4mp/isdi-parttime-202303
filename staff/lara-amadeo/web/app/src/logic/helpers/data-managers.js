import { users } from "../../data.js"


export const retrieveUser = (userId) => {
    let user =  findUserbyId(userId)

    if(!user) throw new Error ('User not found')

    else {
        return user = {
            id: user.id,
            name: user.username,
            avatar: user.avatar
        }
    }
}

export const findUserbyEmail = (email) => {
    return users.find(user => user.email === email)
 }

export const findUserbyId = (userId) => {
    return users.find(user => user.id === userId)
 }