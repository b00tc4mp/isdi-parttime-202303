const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Workspot } = require('../../data/models');

module.exports = (userId, { districts, category, features }) => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspots = await Workspot.find()
            .select('-__v -features.wifi._id -features.plugs._id -features.noise._id -features.otherFeatures._id -location._id -location.districts._id -location.mapLocation._id')
            .populate('author', 'name avatar')
            .lean()

        workspots.forEach(workspot => {
            workspot.id = workspot._id.toString()

            delete workspot._id

            workspot.fav = user.favs.some(favs => favs.toString() === workspot.id)

            if (workspot.author._id) {
                workspot.author.id = workspot.author._id.toString()

                delete workspot.author._id
            }

        })
        const filteredWorkspots = workspots.filter(workspot => {

            const districtsMatch = Object.keys(districts).every(district =>
                districts[district] === true ? workspot.location.districts[district] === true : true
            );

            const categoryMatch = Object.keys(category).every(categoryOption =>
                category[categoryOption] === true ? workspot.category[categoryOption] === true : true
            );

            const featuresMatch = Object.keys(features).every(featureType => {
                return Object.keys(features[featureType]).every(feature =>
                    features[featureType][feature] === true ?
                        workspot.features[featureType][feature] === true :
                        features[featureType][feature] === false
                );
            });
            return districtsMatch && categoryMatch && featuresMatch;
            
        });
        return filteredWorkspots;

    })()
}


