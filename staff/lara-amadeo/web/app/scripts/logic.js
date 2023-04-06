import { users } from "./data.js"
import { validateEmail, validatePassword, validateAvatarFormat } from "./validators.js"

export const registerUser = (registrationName, registrationEmail, registrationPassword,registrationRepPassword) => {

    validateEmail(registrationEmail)
    validatePassword(registrationPassword)
    validatePassword(registrationRepPassword, 'new password')

    const foundUser = findUserbyEmail(users, registrationEmail)

    if (foundUser) throw new Error('User already exists')

    if(registrationPassword !== registrationRepPassword) throw new Error('Passwords do not match')
            
    else{ 
        
        let id = 'user-1'
        const lastUser = users[users.length - 1]
        
        id = 'user-' + (Number(lastUser.id.slice(5)) + 1)

        users.push({
                id,
                username: registrationName,
                email: registrationEmail,
                password: registrationPassword
               })

        console.log(users)
    }
}

export const checkCredentials = (inputEmail, inputPassword) => {
    const foundUser = findUserbyEmail(inputEmail)

    if (!foundUser) throw new Error('User not found')
    if (foundUser.password !== inputPassword) throw new Error('Invalid email or password')
}

export const retrieveUser = () => {
    let user =  findUserbyId(authenticatedId)

    if(!user) throw new Error ('User not found')

    else {
        return user = {
            name: user.username,
            avatar: user.avatar
        }
    }
}

export const updatePassword = (authenticatedId, currentPassword, newPassword, confirmNewPassword) => {

    const foundUser = findUserbyId(authenticatedId)

    if (!foundUser)
        throw new Error('User not found')

    if (currentPassword !== foundUser.password)
        throw new Error('Invalid current password')

    if (currentPassword === newPassword)
        throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword)
        throw new Error('New passwords do not match')

    foundUser.password = newPassword
    console.log(users)
 }


export const updateEmail = (authenticatedEmail, currentEmail, newEmail, confirmNewEmail) => {

    const user = findUserbyEmail(authenticatedEmail)

    if (!user)
    throw new Error('User not found')

    if (currentEmail !== authenticatedEmail)
    throw new Error('Invalid current email')

    if (currentEmail === newEmail)
    throw new Error('New email cannot be the same as current email')

    if (newEmail !== confirmNewEmail)
    throw new Error('New emails do not match')

    user.email = newEmail
    authenticatedEmail = newEmail
}

//new update user
// export const updateAvatar = (authenticatedEmail, uploadedFile) => {

//     const user = findUserbyEmail(users, authenticatedEmail)

//     if(!user) throw new Error ('User not found')

//     else{
//             const reader = new FileReader()
//             const file = uploadedFile
//             reader.onload = () => {
//                     reader.result
//             } 
//             reader.readAsDataURL(file)
//             URL.createObjectURL(file)
//         }
// } 

export const updateAvatar = (authenticatedId, avatarUrl) => {

    validateAvatarFormat(avatarUrl)
    const user = findUserbyId(authenticatedId)
    if (!user)
    throw new Error('User not found')

    user.avatar = avatarUrl
} 

const findUserbyEmail = (authenticatedEmail) => {
    return users.find(user => user.email === authenticatedEmail)
 }

 const findUserbyId = (authenticatedId) => {
    return users.find(user => user.id === authenticatedId)
 }