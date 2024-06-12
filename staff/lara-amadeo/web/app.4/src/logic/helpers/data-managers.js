import { users } from "../../data.js"


export const retrieveUser = (userId) => {
    let foundUser =  findUserbyId(userId)

    if(!foundUser) throw new Error ('User not found')

    else {
        
        const user = {
            username: foundUser.username,
            email: foundUser.email,
            avatar: foundUser.avatar
        }
        return user
    }
}

export const findUserbyEmail = (email) => {
    const _users = users()
    return _users.find(user => user.email === email)
 }

export const findUserbyId = (userId) => {
    const _users = users()
    return _users.find(user => user.id === userId)
 }