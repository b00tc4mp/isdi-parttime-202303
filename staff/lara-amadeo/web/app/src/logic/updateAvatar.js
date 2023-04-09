// import { validateAvatarFormat } from "./helpers/validators.js"
// import { findUserbyId } from "./helpers/data-managers.js"


// export const updateAvatar = (userId, avatarUrl) => {

//     validateAvatarFormat(avatarUrl)
//     const user = findUserbyId(userId)
//     if (!user)
//     throw new Error('User not found')

//     user.avatar = avatarUrl
// } 


// new update user
export const updateAvatar = (uploadedFile) => {

            const reader = new FileReader()
            const file = uploadedFile
            reader.onload = () => {
                    reader.result
            } 
            reader.readAsDataURL(file)
            URL.createObjectURL(file)
        }

