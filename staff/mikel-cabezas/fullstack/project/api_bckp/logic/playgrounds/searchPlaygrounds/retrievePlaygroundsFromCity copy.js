
const { User, Playground } = require('../../../data/models')
const fetch = require('node-fetch');

const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @returns {Promise<Object>} returns a promise object contains Z sanatized playgrounds 
  * 
 * @throws {TypeError} on non-string userId (sync)
 * @throws {ContentError} on empty userId (sync)
 * 
 * @throws {ExistenceError} on user not found (async)
 */

module.exports = (token, userId, city) => {
    validateUserId(userId)

    // token, name, description, sunExposition, elements, images, location

    // let mapsResponse

    return fetch(`https://maps-api.apple.com/v1/geocode?q=${city}&lang=es-ES`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.accessToken}`,
        },
    })
        .then(res => {
            if (res.status !== 200)
                return res.json().then(({ error: message }) => { throw new Error(message) })
            return res.json()
        })
        .then(mapsResponse => {
            try {
                debugger
                const longRegion = mapsResponse.results[0].displayMapRegion.westLongitude - mapsResponse.results[0].displayMapRegion.eastLongitude
                const latRegion = mapsResponse.results[0].displayMapRegion.southLatitude - mapsResponse.results[0].displayMapRegion.northLatitude
                console.log(longRegion, latRegion)
                const latitude = mapsResponse.results[0].coordinate.latitude
                const longitude = mapsResponse.results[0].coordinate.longitude
                const coordinates = [latitude, longitude]
                return Playground.find(
                    {
                        location:
                        {
                            $near:
                            {
                                $geometry: { type: "Point", coordinates: [latitude, longitude] },
                                $maxDistance: 10000
                            }
                        }
                    }
                )
                    .then(playgrounds => [coordinates, playgrounds])

            } catch (error) {
                console.log(error.message)
            }
        })

}
