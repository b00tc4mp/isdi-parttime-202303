require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError, DuplicityError }
} = require("com")
const { User } = require("../../data/models")

module.exports = function deleteFriend(userId, requestedUsername) {
    validateId(userId)
    validateText(requestedUsername)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })
        if (!requestedUser) throw new ExistenceError("requestedFriend wasnt found")


        if (!user.friends.includes(requestedUser.id)) throw new ExistenceError("requestedUser not found in user friends array")

        await user.updateOne({ $pull: { friends: requestedUser.id } });
    })()
}