const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError },
} = require('com')

const { User, Workspot } = require('../../data/models')

module.exports = (userId, image, name, location, description, category, features) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(name, 'name')
    validateText(description, 'description')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        return Workspot.create({
            author: userId,
            image,
            name,
            location: {
                street: location.street,
                postalCode: location.postalCode,
                city: location.city,
                country: location.country,
                districts: { ...location.districts },
                mapLocation: {
                    location: 'Point',
                    coordinates: location.mapLocation.coordinates
                },
            },
            description,
            category,
            features
        })
    })()
}
