import { useState } from 'react';
import createWorkspot from '../../logic/createWorkspot'
import { useAppContext, useHandleErrors } from '../hooks'
import { Form, Input, Button, TextArea, CheckboxContainer, Select } from '../library'
import { formatCategory, formatOtherFeatures, formatDistrict, formatWifi, formatPlugs, formatNoise } from './helpers/dataFormatters'
import { CancelIcon } from '../library/Icons'

const initialDistricts = {
    ciutatVella: false,
    gracia: false,
    horta: false,
    lEixample: false,
    lesCorts: false,
    nouBarris: false,
    santAndreu: false,
    santMarti: false,
    santsMontjuic: false,
    sarriaSantGervasi: false
}

const initialWifi = {
    unlimitedFree: false,
    timeLimited: false,
    timeLimitedWithPurchase: false,
    paidOptions: false,
    unavailable: false
}

const initialPlugs = {
    none: false,
    few: false,
    plenty: false
}

const initialNoise = {
    quiet: false,
    moderate: false,
    loud: false
}

const initialCategory = {
    coffeeShop: false,
    restaurant: false,
    coWorking: false,
    library: false,
    hotelLobby: false
}

const initialOtherFeatures = {
    accessibility: false,
    petFriendly: false,
    ensuiteKitchen: false,
    onSiteRestaurant: false,
    meetingRooms: false,
    parking: false,
    bikeRack: false,
    printScanCopy: false,
    projector: false,
    windowView: false
}


export default function AddWorkspotModal({ onCancel, onWorkspotCreated }) {
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleCancel = event => {
        event.preventDefault()
        onCancel()
    }

    const [districts, setDistricts] = useState(initialDistricts);
    const [selectedDistrict, setSelectedDistrict] = useState(null)


    const [wifi, setWifi] = useState(initialWifi);
    const [selectedWifi, setSelectedWifi] = useState(null)

    const [plugs, setPlugs] = useState(initialPlugs);
    const togglePlugs = plugOption => {
        setPlugs(prevPlugs => ({
            ...prevPlugs,
            [plugOption]: !prevPlugs[plugOption],
        }))
    }

    const [noise, setNoise] = useState(initialNoise);
    const toggleNoise = noiseOption => {
        setNoise(prevNoise => ({
            ...prevNoise,
            [noiseOption]: !prevNoise[noiseOption],
        }))
    }

    const [initCategory, setInitCategory] = useState(initialCategory);
    const [selectedCategory, setSelectedCategory] = useState(null)


    const [otherFeatures, setOtherFeatures] = useState(initialOtherFeatures);
    const toggleOtherFeatures = OtherFeaturesOption => {
        setOtherFeatures(prevOtherFeatures => ({
            ...prevOtherFeatures,
            [OtherFeaturesOption]: !prevOtherFeatures[OtherFeaturesOption],
        }))
    }

    const handleCreateWorkspot = event => {
        event.preventDefault()

        const location = {
            street: event.target.street.value,
            postalCode: event.target.postalCode.value,
            city: event.target.city.value,
            country: event.target.country.value,
            districts: {
                ...districts,
                [selectedDistrict]: true,
            },
            mapLocation: {
                location: 'Point',
                coordinates: [
                    parseFloat(event.target.latitude.value),
                    parseFloat(event.target.longitude.value),
                ],
            },
        }

        const category = {
            ...initCategory,
            [selectedCategory]: true
        }

        const features = {
            wifi: {
                ...wifi,
                [selectedWifi]: true,
            },
            plugs: plugs,
            noise: noise,
            otherFeatures: otherFeatures
        }

        const image = event.target.image.value
        const name = event.target.name.value
        const description = event.target.description.value

        handleErrors(async () => {
            await createWorkspot(image, name, location, description, category, features)
            onWorkspotCreated()
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-gray-light w-full h-full p-4">
                <div className="relative overflow-y-scroll mx-auto bg-white md:w-1/2 lg:w-1/2 xl:w-1/2 sm:w-full h-screen rounded-lg">

                    <div className="absolute top-0 w-full h-24 bg-indigo-light px-4 py-8">
                        <h1 className="font-bold text-xl text-gray-dark px-4 mb-4">Add a new workspot</h1>
                        <div className="absolute top-0 right-0 px-6 py-6 flex flex-row gap-4">
                            <button onClick={handleCancel}>
                                <CancelIcon />
                            </button>
                        </div>
                    </div>

                    <Form className="flex flex-col gap-8 px-8 mb-8 mt-40" onSubmit={handleCreateWorkspot}>
                        <div className="flex flex-col gap-4">
                            <label className="block text-md font-bold text-gray-dark">
                                Name
                            </label>
                            <Input name="name" placeholder="Name" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="block text-md font-bold text-gray-dark">
                                Image
                            </label>
                            <Input type="url" name="image" placeholder="Image url" />

                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="block text-md font-bold text-gray-dark">
                                Description
                            </label>
                            <TextArea name="description" placeholder="Add description" />

                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="block text-md font-bold text-gray-dark">
                                Location
                            </label>
                            <Input name="street" placeholder="Street" />
                            <Input name="postalCode" placeholder="Postal code" />
                            <Input name="city" placeholder="City" />
                            <Input name="country" placeholder="Country" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="block text-md font-bold text-gray-dark">
                                Coordinates
                            </label>
                            <Input name="latitude" placeholder="Latitude" />
                            <Input name="longitude" placeholder="Longitude" />
                        </div>

                        <label className="block text-md font-bold text-gray-dark">
                            District
                        </label>
                        <Select
                            value={selectedDistrict}
                            onChange={(event) => setSelectedDistrict(event.target.value)}
                            className="text-gray"

                        >
                            <option value={null}>Please select</option>
                            {Object.keys(districts).map((district) => (
                                <option key={district} value={district}>
                                    {formatDistrict(district)}
                                </option>
                            ))}
                        </Select>

                        <label className="block text-md font-bold text-gray-dark">
                            Category
                        </label>
                        <Select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            className="text-gray"
                        >
                            <option value={null}>Please select</option>
                            {Object.keys(initCategory).map((categoryOption) => (
                                <option key={categoryOption} value={categoryOption}>
                                    {formatCategory(categoryOption)}
                                </option>
                            ))}
                        </Select>

                        <label className="block text-md font-bold text-gray-dark">
                            Wifi
                        </label>
                        <Select
                            value={selectedWifi}
                            onChange={(event) => setSelectedWifi(event.target.value)}
                            className="text-gray"

                        >
                            <option value={null}>Please select</option>
                            {Object.keys(wifi).map((wifiOption) => (
                                <option key={wifiOption} value={wifiOption} >
                                    {formatWifi(wifiOption)}
                                   
                                </option>
                            ))}
                        </Select>

                        <CheckboxContainer className="flex flex-col w-full rounded-lg border-gray shadow-md">
                            <label className="block text-md font-bold text-gray-dark">Plugs:</label>
                            <div className="flex flex-row gap-4 justify-between">
                                {Object.keys(plugs).map(plugOption => (
                                    <label key={plugOption} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={plugs[plugOption]}
                                            onChange={() => togglePlugs(plugOption)}
                                            className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"

                                        />
                                        {formatPlugs(plugOption)}
                                    </label>
                                ))}
                            </div>
                        </CheckboxContainer>

                        <CheckboxContainer className="flex flex-col">
                            <label className="block text-md font-bold text-gray-dark">Noise:</label>
                            <div className="flex flex-row gap-4 justify-between">
                                {Object.keys(noise).map(noiseOption => (
                                    <label key={noiseOption} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={noise[noiseOption]}
                                            onChange={() => toggleNoise(noiseOption)}
                                            className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"

                                        />
                                        {formatNoise(noiseOption)}
                                    </label>
                                ))}
                            </div>
                        </CheckboxContainer>

                        <CheckboxContainer className="flex flex-col">
                            <label className="block text-md font-bold text-gray-dark">Other Features:</label>
                            {Object.keys(otherFeatures).map(OtherFeaturesOption => (
                                <label key={OtherFeaturesOption} className="flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        checked={otherFeatures[OtherFeaturesOption]}
                                        onChange={() => toggleOtherFeatures(OtherFeaturesOption)}
                                        className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    {formatOtherFeatures(OtherFeaturesOption)}
                                </label>
                            ))}
                        </CheckboxContainer>

                        <Button type="submit">Create</Button>

                    </Form>
                </div>
            </div >
        </div >
    )
}

