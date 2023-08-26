const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Workspot } = require('../../data/models');

module.exports = (userId, { districts, category, features }) => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const districtQuery = {
            $or: []
        }

        if (Object.values(districts).some(val => val)) {
            for (const district in districts) {
                if (districts[district]) {
                    districtQuery.$or.push({ [`location.districts.${district}`]: true })
                }
            }
        }

        let filteredDistrictResults = []

        if (districtQuery.$or.length > 0) {
            filteredDistrictResults = await Workspot.find(districtQuery).lean()

        } else {
            filteredDistrictResults = await Workspot.find().lean()
        }

        let filteredCategoryResults = filteredDistrictResults

        if (Object.values(category).some(val => val)) {
            filteredCategoryResults = filteredDistrictResults.filter(workspot => {
                return Object.keys(category).some(categoryOption => {
                    return category[categoryOption] && workspot.category[categoryOption];
                })
            })
        }

        let filteredWifiResults = filteredCategoryResults;

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
                    return features.plugs[plugsOption] && workspot.features.plugs[plugsOption];
                })
            })
        }

        let filteredNoisePlugs = filteredPlugsResults

        if (Object.values(features.noise).some(val => val)) {
            filteredNoisePlugs = filteredPlugsResults.filter(workspot => {
                return Object.keys(features.noise).some(noiseOption => {
                    return features.noise[noiseOption] && workspot.features.noise[noiseOption];
                })
            })
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