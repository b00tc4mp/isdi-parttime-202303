const { User, Playground } = require('../../data/models')

const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @returns {Promise<Object>} returns a promise object contains de sanatized playgrounds 
  * 
 * @throws {TypeError} on non-string userId (sync)
 * @throws {ContentError} on empty userId (sync)
 * 
 * @throws {ExistenceError} on user not found (async)
 */
module.exports = (userId, location) => {
    validateUserId(userId)
    console.log(location)
    const latitude = location.latitude
    const longitude = location.longitude
    const coordinates = [latitude, longitude]
    try {
        return Promise.all([
            Playground.find({
                location: {
                    $near: {
                        $geometry: { type: "Point", coordinates: coordinates },
                        // $maxDistance: maxDistance
                        $maxDistance: 10000
                    }
                }
            }).lean()
        ])
            // .then(playgrounds => [playgrounds])
            .then(playgrounds => [playgrounds])
    } catch (error) {
        console.log(error.message)
    }
}