const {
    validators: { validateId, validateText, validateUrl, validateBoolean },
    errors: { ExistenceError }
} = require('com')
const { User, Mission } = require('../data/models')

/**
 * 
 * @param {string} userId User id
 * @param {string} missionId Mission id
 * @param {string} image New mission image
 * @param {string} tittle New mission tittle
 * @param {string} info New mission info
 * @param {string} level New mission level
 * @param {string} difficulty New mission difficulty
 * @param {boolean} visibility New mission visibility
 * 
 * @returns
 * 
 * @throws {TypeError} On non-string user id, mission id, mission image, mission tittle, mission info, mission level, mission difficulty or mission visibility
 * @throws {ContentError} On empty user id, mission id, mission image, mission tittle, mission info, mission level, mission difficulty or mission visibility
 * @throws {ExistenceError} On non-existing user or mission
 */

module.exports = (userId, missionId, image, tittle, info, level, difficulty, visibility) => {
    validateId(userId, 'user id')
    validateId(missionId, 'post id')
    validateUrl(image, 'image url')
    validateText(tittle, 'tittle text')
    validateText(info, 'info text')
    validateText(level, 'level text')
    validateText(difficulty, 'info text')
    validateBoolean(visibility, 'visibility boolean')

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