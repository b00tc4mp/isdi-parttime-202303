import { validateId, validateUrl } from "./helpers/validators"
import { saveUser, findUserById } from '../data'

export const updateUserAvatar = (userId, avatarUrl) => {
    validateId(userId, 'user id')
    validateUrl(avatarUrl, 'Avatar url')

    const foundUser = findUserById(userId)

    if(!foundUser) throw new Error('Something went wrong. User not found', {cause: "ownError"})

    foundUser.avatar = avatarUrl

    saveUser(foundUser)
}