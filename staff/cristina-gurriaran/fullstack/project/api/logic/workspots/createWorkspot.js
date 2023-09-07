const {
    validators: { validateId, validateUrl, validateText, validateObject },
    errors: { ExistenceError },
} = require('com')

const { User, Workspot } = require('../../data/models')

module.exports = (userId, image, name, location, description, category, features) => {
    validateUrl(image, 'image url')
    validateText(name, 'name')
    validateObject(location, 'location')
    validateText(description, 'description')
    validateObject(category, 'category')
    validateObject(features, 'features')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        debugger

        return await Workspot.create({
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
