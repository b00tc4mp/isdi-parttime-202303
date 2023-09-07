import { useState, useEffect } from 'react';
import updateWorkspot from '../../logic/updateWorkspot'
import retrieveWorkspot from '../../logic/retrieveWorkspot'
import { useAppContext, useHandleErrors } from '../hooks'
import { Button, Input, Form, TextArea, CheckboxContainer } from '../library'
import { formatCategory, formatOtherFeatures, formatDistrict, formatWifi, formatPlugs, formatNoise } from './helpers/dataFormatters'

export default function EditWorkspotModal({ onCancel, workspotId, onWorkspotEdited }) {
    const { alert } = useAppContext()
    const handleErrors = useHandleErrors()

    const [workspotData, setWorkspotData] = useState(null)

    function handleCancel(event) {
        event.preventDefault()
        onCancel()
    }

    function handleEditWorkspot(event) {
        event.preventDefault()

        const image = event.target.image.value
        const name = event.target.name.value
        const description = event.target.description.value

        const districts = {};
        for (const districtOption in workspotData.location.districts) {
            districts[districtOption] = event.target[`districts[${districtOption}]`].checked
        }

        const location = {
            street: event.target.street.value,
            postalCode: event.target.postalCode.value,
            city: event.target.city.value,
            country: event.target.country.value,
            districts: districts,
            mapLocation: {
                location: 'Point',
                coordinates: [
                    parseFloat(event.target.latitude.value),
                    parseFloat(event.target.longitude.value),
                ],
            },
        }

       
        const category = {}
        Object.keys(workspotData.category).forEach((categoryOption) => {
            category[categoryOption] = event.target[`category[${categoryOption}]`].checked;
        })

        const updatedWifi = {}
        Object.keys(workspotData.features.wifi).forEach((wifiOption) => {
            updatedWifi[wifiOption] = event.target[`wifi[${wifiOption}]`].checked;
        })

        const updatedPlugs = {}
        Object.keys(workspotData.features.plugs).forEach((plugOption) => {
            updatedPlugs[plugOption] = event.target[`plugs[${plugOption}]`].checked
        })

        const updatedNoise = {}
        Object.keys(workspotData.features.noise).forEach((noiseOption) => {
            updatedNoise[noiseOption] = event.target[`noise[${noiseOption}]`].checked
        })

        const updatedOtherFeatures = {}
        Object.keys(workspotData.features.otherFeatures).forEach((otherFeaturesOption) => {
            updatedOtherFeatures[otherFeaturesOption] = event.target.elements[`otherFeatures[${otherFeaturesOption}]`].checked;
        })

        const features = {
            wifi: updatedWifi,
            plugs: updatedPlugs,
            noise: updatedNoise,
            otherFeatures: updatedOtherFeatures
        }

        handleErrors(async () => {
            await updateWorkspot(workspotId, image, name, location, description, category, features)
            onWorkspotEdited();

        })
    }

    useEffect(() => {
        try {

            handleErrors(async () => {
                const workspot = await retrieveWorkspot(workspotId);
                setWorkspotData(workspot)

            })
        } catch (error) {

            alert(error.message)
        }
    }, [workspotId])

    console.log('EditWorkspotModal -> render')

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-gray-light w-full h-full px-5">
                {workspotData && (
                    <div className="overflow-auto mx-auto bg-white md:w-1/2 lg:w-2/3 xl:w-2/3 sm:w-full h-2/3 m-20 p-10 rounded-md">
                        <Form className="flex flex-col gap-4" onSubmit={handleEditWorkspot}>
                            <h1 className="font-bold text-xl text-gray-dark">Edit workspot</h1>

                            <Input
                                type="url"
                                name="image"
                                placeholder="Image url"
                                defaultValue={workspotData.image}
                            />
                            <Input name="name" placeholder="Name" defaultValue={workspotData.name} />
                            <TextArea
                                name="description"
                                placeholder="Description"
                                defaultValue={workspotData.description}
                            />
                            <Input
                                name="street"
                                placeholder="Street"
                                defaultValue={workspotData.location.street}
                            />
                            <Input
                                name="postalCode"
                                placeholder="Postal code"
                                defaultValue={workspotData.location.postalCode}
                            />
                            <Input name="city" placeholder="City" defaultValue={workspotData.location.city} />
                            <Input
                                name="country"
                                placeholder="Country"
                                defaultValue={workspotData.location.country}
                            />
                            <Input
                                name="latitude"
                                placeholder="Latitude"
                                defaultValue={workspotData.location.mapLocation.coordinates[0]}
                            />
                            <Input
                                name="longitude"
                                placeholder="Longitude"
                                defaultValue={workspotData.location.mapLocation.coordinates[1]}
                            />

                            <CheckboxContainer className="flex flex-col">
                                <label className="font-bold">Districts:</label>
                                {Object.keys(workspotData.location.districts).map((districtOption) => (
                                    <label key={districtOption} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            name={`districts[${districtOption}]`}
                                            defaultChecked={workspotData.location.districts[districtOption]}
                                            className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        {formatDistrict(districtOption)}
                                    </label>
                                ))}
                            </CheckboxContainer>

                            <CheckboxContainer className="flex flex-col">
                                <label className="font-bold">Category:</label>
                                <div className="pl-4 flex flex-col gap-4">
                                    {Object.keys(workspotData.category).map((categoryOption) => (
                                        <label key={categoryOption} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                name={`category[${categoryOption}]`}
                                                defaultChecked={workspotData.category[categoryOption]}
                                                className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            {formatCategory(categoryOption)}
                                        </label>
                                    ))}
                                </div>
                            </CheckboxContainer>

                            <CheckboxContainer className="flex flex-col">
                                <label className="font-bold">Wifi:</label>
                                {Object.keys(workspotData.features.wifi).map((wifiOption) => (
                                    <label key={wifiOption} className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            name={`wifi[${wifiOption}]`}
                                            defaultChecked={workspotData.features.wifi[wifiOption]}
                                            className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        {formatWifi(wifiOption)}
                                    </label>
                                ))}
                            </CheckboxContainer>

                            <CheckboxContainer className="flex flex-col">
                                <label className="font-bold">Plugs:</label>
                                <div className="flex flex-row gap-4 justify-between">
                                    {Object.keys(workspotData.features.plugs).map((plugOption) => (
                                        <label key={plugOption} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                name={`plugs[${plugOption}]`}
                                                defaultChecked={workspotData.features.plugs[plugOption]}
                                                className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            {formatPlugs(plugOption)}
                                        </label>
                                    ))}
                                </div>
                            </CheckboxContainer>

                            <CheckboxContainer className="flex flex-col">
                                <label className="font-bold">Noise:</label>
                                <div className="flex flex-row gap-4 justify-between">
                                    {Object.keys(workspotData.features.noise).map((noiseOption) => (
                                        <label key={noiseOption} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                name={`noise[${noiseOption}]`}
                                                defaultChecked={workspotData.features.noise[noiseOption]}
                                                className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            {formatNoise(noiseOption)}
                                        </label>
                                    ))}
                                </div>
                            </CheckboxContainer>

                            <CheckboxContainer className="flex flex-col">
                                <label className="font-bold">Other Features:</label>
                                {Object.keys(workspotData.features.otherFeatures).map(
                                    (otherFeaturesOption) => (
                                        <label key={otherFeaturesOption} className="flex items-center text-sm">
                                            <input
                                                type="checkbox"
                                                name={`otherFeatures[${otherFeaturesOption}]`}
                                                defaultChecked={workspotData.features.otherFeatures[otherFeaturesOption]}
                                                className="mr-2 h-5 w-5 text-indigo-600 border border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            {formatOtherFeatures(otherFeaturesOption)}
                                        </label>
                                    )
                                )}
                            </CheckboxContainer>

                            <Button type="submit">Edit</Button>
                            <Button type="button" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    )
}
