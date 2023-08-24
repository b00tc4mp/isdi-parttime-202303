import { useState, useEffect } from 'react';
import updateWorkspot from '../../logic/updateWorkspot'
import retrieveWorkspot from '../../logic/retrieveWorkspot'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button, TextArea, Label } from '../library'
import { formatCategory, formatOtherFeatures, formatDistrict, formatWifi, formatPlugs, formatNoise } from './helpers/dataFormatters'

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
    sarriaSantGervasi: false,
};

const initialCategory = {
    coffeeShop: false,
    restaurant: false,
    coWorking: false,
    library: false,
    hotelLobby: false,
};

const initialWifi = {
    unlimitedFree: false,
    timeLimited: false,
    timeLimitedWithPurchase: false,
    paidOptions: false,
    unavailable: false,
};

const initialPlugs = {
    none: false,
    few: false,
    plenty: false,
};

const initialNoise = {
    quiet: false,
    moderate: false,
    loud: false,
};

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
    windowView: false,
};

export default function EditWorkspotModal({ onCancel, workspotId, onWorkspotEdited }) {
    const { alert } = useAppContext();
    const handleErrors = useHandleErrors();

    const [workspotData, setWorkspotData] = useState(null);
    const [districts, setDistricts] = useState(initialDistricts);
    const [category, setCategory] = useState(initialCategory);
    const [wifi, setWifi] = useState(initialWifi);
    const [plugs, setPlugs] = useState(initialPlugs);
    const [noise, setNoise] = useState(initialNoise);
    const [otherFeatures, setOtherFeatures] = useState(initialOtherFeatures);

    function handleCancel(event) {
        event.preventDefault();
        onCancel();
    }

    function handleEditWorkspot(event) {
        event.preventDefault();

        const image = event.target.image.value;
        const name = event.target.name.value;
        const description = event.target.description.value;

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
        };

        const updatedCategory = {};
        for (const categoryOption in category) {
            updatedCategory[categoryOption] = event.target[`category[${categoryOption}]`].checked;
        }

        const updatedWifi = {};
        for (const wifiOption in wifi) {
            updatedWifi[wifiOption] = event.target[`wifi[${wifiOption}]`].checked;
        }

        const updatedPlugs = {};
        for (const plugOption in plugs) {
            updatedPlugs[plugOption] = event.target[`plugs[${plugOption}]`].checked;
        }

        const updatedNoise = {};
        for (const noiseOption in noise) {
            updatedNoise[noiseOption] = event.target[`noise[${noiseOption}]`].checked;
        }

        const updatedOtherFeatures = {};
        for (const otherFeaturesOption in otherFeatures) {
            updatedOtherFeatures[otherFeaturesOption] = event.target[`otherFeatures[${otherFeaturesOption}]`].checked;
        }

        const features = {
            wifi: updatedWifi,
            plugs: updatedPlugs,
            noise: updatedNoise,
            otherFeatures: updatedOtherFeatures,
        };

        const updatedWorkspot = {
            image: image,
            name: name,
            description: description,
            location: location,
            category: updatedCategory,
            features: features,
        };

        handleErrors(async () => {
            await updateWorkspot(workspotId, image, name, location, description, category, features);
            onWorkspotEdited();

        });
    } 

    useEffect(() => {
        try {
      
            handleErrors(async () => {
                const workspot = await retrieveWorkspot(workspotId);
                setWorkspotData(workspot);
                setDistricts(workspot.location.districts);
                setCategory(workspot.category);
                setWifi(workspot.features.wifi);
                setPlugs(workspot.features.plugs);
                setNoise(workspot.features.noise);
                setOtherFeatures(workspot.features.otherFeatures);

            });
        } catch (error) {
        
            alert(error.message);
        }
    }, [workspotId]);

    console.log('EditWorkspotModal -> render');

    return (
        <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 overflow-auto bg-white shadow-lg rounded-lg">
            {workspotData && (
                <Container tag="section" className="modal">
                    <Form onSubmit={handleEditWorkspot}>
                        <input type="url" name="image" placeholder="Image url" defaultValue={workspotData.image} />
                        <textarea name="name" placeholder="Name" defaultValue={workspotData.name} />
                        <textarea name="description" placeholder="Description" defaultValue={workspotData.description} />
                        <textarea name="street" placeholder="Street" defaultValue={workspotData.location.street} />
                        <textarea name="postalCode" placeholder="Postal code" defaultValue={workspotData.location.postalCode} />
                        <textarea name="city" placeholder="City" defaultValue={workspotData.location.city} />
                        <textarea name="country" placeholder="Country" defaultValue={workspotData.location.country} />
                        <textarea name="latitude" placeholder="Latitude" defaultValue={workspotData.location.mapLocation.coordinates[0]} />
                        <textarea name="longitude" placeholder="Longitude" defaultValue={workspotData.location.mapLocation.coordinates[1]} />

                        <label>Districts:</label>
                        {Object.keys(initialDistricts).map(district => (
                            <label key={district}>
                                <input
                                    type="checkbox"
                                    name={`districts[${district}]`}
                                    defaultChecked={workspotData.location.districts[district]}
                                />
                                {formatDistrict(district)}
                            </label>
                        ))}

                        <label>Category:</label>
                        {Object.keys(initialCategory).map(categoryOption => (
                            <label key={categoryOption}>
                                <input
                                    type="checkbox"
                                    name={`category[${categoryOption}]`}
                                    defaultChecked={workspotData.category[categoryOption]}
                                />
                                {formatCategory(categoryOption)}
                            </label>
                        ))}


                        <label>Wifi:</label>
                        {Object.keys(initialWifi).map(wifiOption => (
                            <label key={wifiOption}>
                                <input
                                    type="checkbox"
                                    name={`wifi[${wifiOption}]`}
                                    defaultChecked={workspotData.features.wifi[wifiOption]}
                                />
                                {formatWifi(wifiOption)}
                            </label>
                        ))}

                        <label>Plugs:</label>
                        {Object.keys(initialPlugs).map(plugOption => (
                            <label key={plugOption}>
                                <input
                                    type="checkbox"
                                    name={`plugs[${plugOption}]`}
                                    defaultChecked={workspotData.features.plugs[plugOption]}
                                />
                                {formatPlugs(plugOption)}
                            </label>
                        ))}

                        <label>Noise:</label>
                        {Object.keys(initialNoise).map(noiseOption => (
                            <label key={noiseOption}>
                                <input
                                    type="checkbox"
                                    name={`noise[${noiseOption}]`}
                                    defaultChecked={workspotData.features.noise[noiseOption]}
                                />
                                {formatNoise(noiseOption)}
                            </label>
                        ))}

                        <label>Other Features:</label>
                        {Object.keys(initialOtherFeatures).map(otherFeaturesOption => (
                            <label key={otherFeaturesOption}>
                                <input
                                    type="checkbox"
                                    name={`otherFeatures[${otherFeaturesOption}]`}
                                    defaultChecked={workspotData.features.otherFeatures[otherFeaturesOption]}
                                />
                                {formatOtherFeatures(otherFeaturesOption)}
                            </label>
                        ))}

                        <Button type="submit">Edit</Button>
                        <Button type="button" onClick={handleCancel}>Cancel</Button>
                    </Form>
                </Container>
                
            )}
        </div >
    );
}