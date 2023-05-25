import { findUserById } from "../helpers/dataManagers"
import { validateId } from "../helpers/validators"

export default function retrieveUser (userId) {
    validateId(userId)

    const user = findUserById(userId)

    return {name: user.name, image: user.image}
}