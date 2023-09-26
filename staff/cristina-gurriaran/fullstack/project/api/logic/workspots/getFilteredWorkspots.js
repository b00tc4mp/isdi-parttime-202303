const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Workspot } = require('../../data/models')

module.exports = (userId, { districts, category, features }) => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const districtQuery = {
            $or: []
        }

        Object.keys(districts).forEach(district => {
            if (districts[district]) {
                districtQuery.$or.push({ [`location.districts.${district}`]: true });
            }
        })

        let filteredDistrictResults = []

        if (districtQuery.$or.length > 0) {
            filteredDistrictResults = await Workspot.find(districtQuery).lean()
                .select('-__v -features.wifi._id -features.plugs._id -features.noise._id -features.otherFeatures._id -location._id -location.districts._id -location.mapLocation._id -reviews._id -reviews.__v')
                .populate('author', 'name avatar')
                .populate('reviews.author', 'name avatar')
                .lean()

            filteredDistrictResults.forEach(workspot => {
                workspot.id = workspot._id.toString();
                delete workspot._id

                workspot.fav = user.favs.some(favs => favs.toString() === workspot.id)

                if (workspot.author._id) {
                    workspot.author.id = workspot.author._id.toString()
                    delete workspot.author._id
                }

                if (workspot.reviews) {
                    workspot.reviews.forEach(review => {
                        if (review.author._id) {
                            review.author.id = review.author._id.toString()
                            delete review.author._id
                        }
                    })
                }
            })
        } else {
            filteredDistrictResults = await Workspot.find().lean()
                .select('-__v -features.wifi._id -features.plugs._id -features.noise._id -features.otherFeatures._id -location._id -location.districts._id -location.mapLocation._id -reviews._id -reviews.__v')
                .populate('author', 'name avatar')
                .populate('reviews.author', 'name avatar')
                .lean()

            filteredDistrictResults.forEach(workspot => {
                workspot.id = workspot._id.toString()
                delete workspot._id

                workspot.fav = user.favs.some(favs => favs.toString() === workspot.id)

                if (workspot.author._id) {
                    workspot.author.id = workspot.author._id.toString()
                    delete workspot.author._id
                }

                if (workspot.reviews) {
                    workspot.reviews.forEach(review => {
                        if (review.author._id) {
                            review.author.id = review.author._id.toString()
                            delete review.author._id
                        }
                    })
                }
            })
        }

        let filteredCategoryResults = filteredDistrictResults

        if (Object.values(category).some(val => val)) {
            filteredCategoryResults = filteredDistrictResults.filter(workspot => {
                return Object.keys(category).some(categoryOption => {
                    return category[categoryOption] && workspot.category[categoryOption]
                })
            })
        }

        let filteredWifiResults = filteredCategoryResults

        if (Object.values(features.wifi).some(val => val)) {
            filteredWifiResults = filteredCategoryResults.filter(workspot => {
                return Object.keys(features.wifi).some(wifiOption => {
                    return features.wifi[wifiOption] && workspot.features.wifi[wifiOption]
                })
            })
        }

        let filteredPlugsResults = filteredWifiResults

        if (Object.values(features.plugs).some(val => val)) {
            filteredPlugsResults = filteredWifiResults.filter(workspot => {
                return Object.keys(features.plugs).some(plugsOption => {
                    return features.plugs[plugsOption] && workspot.features.plugs[plugsOption]
                })
            })
        }

        let filteredNoisePlugs = filteredPlugsResults

        if (Object.values(features.noise).some(val => val)) {
            filteredNoisePlugs = filteredPlugsResults.filter(workspot => {
                return Object.keys(features.noise).some(noiseOption => {
                    return features.noise[noiseOption] && workspot.features.noise[noiseOption]
                });
            });
        }

        let filteredOtherFeaturesResults = filteredNoisePlugs

        if (Object.values(features.otherFeatures).some(val => val)) {
            filteredOtherFeaturesResults = filteredNoisePlugs.filter(workspot => {
                return Object.keys(features.otherFeatures).every(featureOption => {
                    return !features.otherFeatures[featureOption] || workspot.features.otherFeatures[featureOption]
                })
            })
        }

        return filteredOtherFeaturesResults
    })()
}
