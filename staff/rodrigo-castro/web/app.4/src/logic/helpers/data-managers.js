console.log('load data managers')

import { users } from "../../data.js"

export const findUserById = (userId) => {
    return  users.find(user => user.id === userId)
}

export const findUser = (userEmail) => {
    return  users.find(user => user.email === userEmail)
}