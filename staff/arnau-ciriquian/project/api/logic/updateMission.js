const {
    validators: { validateId, validateText, validateUrl },
    errors: { ExistenceError, PropertyError }
} = require('com')
const { User, Mission } = require('../data/models')

module.exports = (userId, missionId, image, tittle, info, level, difficulty, visibility) => {
    validateId(userId, 'user id')
    validateId(missionId, 'post id')
    validateUrl(image, 'image url')
    //validateText(text, 'post text')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Mission.findById(missionId)
                .then(mission => {
                    if (!mission) throw new ExistenceError('mission not found')

                    //if (!mission.author.equals(userId)) throw new PropertyError(`mission with id ${missionId} does not belong to user with id ${userId}`)

                    const newDate = new Date

                    return Mission.updateOne({ '_id': missionId }, { 
                        image: image,
                        tittle: tittle,
                        info: info,
                        level: level,
                        difficulty: difficulty,
                        visibility: visibility,
                        date: newDate })
                })
        })
}