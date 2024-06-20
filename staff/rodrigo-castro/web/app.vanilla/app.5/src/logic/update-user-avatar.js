import { validateId, validateUrl } from "./helpers/validators.js"
import { findUserById } from "./helpers/data-managers.js"

export const updateUserAvatar = (userId, avatarUrl, avatarImg, changeAvatarForm) => {
    validateId(userId, 'user id')
    validateUrl(avatarUrl, 'Avatar url')

    var foundUser = findUserById(userId)

    if(!foundUser) throw new Error('Something went wrong. User not found', {cause: "ownError"})

    foundUser.avatar = avatarUrl
    avatarImg.src = foundUser.avatar

}