import { useState } from 'react';
import createWorkspot from '../../logic/createWorkspot'
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button, TextArea, Label } from '../library'
import { formatDistrictName } from './helpers/dataFormatters'

const initialDistricts = {
    ciutatVella: false,
    gracia: false,
    horta: false,
    leixample: false,
    lesCorts: false,
    nouBarris: false,
    santAndreu: false,
    santMarti: false,
    santsMontjuic: false,
    sarriaSantGervasi: false,
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
    quite: false,
    moderate: false,
    loud: false,
};

const initialType = {
    coffeeShop: false,
    restaurant: false,
    coWorking: false,
    library: false,
    hotelLobby: false,
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


export default function AddWorkspotModal({ onCancel, onWorkspotCreated }) {
    const { alert } = useAppContext();
    const handleErrors = useHandleErrors();

    const handleCancel = event => {
        event.preventDefault();
        onCancel();
    };

    const [districts, setDistricts] = useState(initialDistricts);
    const toggleDistrict = district => {
        setDistricts(prevDistricts => ({
            ...prevDistricts,
            [district]: !prevDistricts[district],
        }));
    };

    const [wifi, setWifi] = useState(initialWifi);
    const toggleWifi = wifiOption => {
        setWifi(prevWifi => ({
            ...prevWifi,
            [wifiOption]: !prevWifi[wifiOption],
        }));
    };

    const [plugs, setPlugs] = useState(initialPlugs);
    const togglePlugs = PlugOption => {
        setPlugs(prevPlugs => ({
            ...prevPlugs,
            [PlugOption]: !prevPlugs[PlugOption],
        }));
    };

    const [noise, setNoise] = useState(initialNoise);
    const toggleNoise = NoiseOption => {
        setNoise(prevNoise => ({
            ...prevNoise,
            [NoiseOption]: !prevNoise[NoiseOption],
        }));
    };

    const [type, setType] = useState(initialType);
    const toggleType = TypeOption => {
        setType(prevType => ({
            ...prevType,
            [TypeOption]: !prevType[TypeOption],
        }));
    };

    const [otherFeatures, setOtherFeatures] = useState(initialOtherFeatures);
    const toggleOtherFeatures = OtherFeaturesOption => {
        setOtherFeatures(prevOtherFeatures => ({
            ...prevOtherFeatures,
            [OtherFeaturesOption]: !prevOtherFeatures[OtherFeaturesOption],
        }));
    };

    const handleCreateWorkspot = event => {
        event.preventDefault();

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
        
        const features = {
            wifi: wifi,
            plugs: plugs,
            noise : noise,
            features : otherFeatures
        }

        const image = event.target.image.value
        const name = event.target.name.value
        const description = event.target.description.value

        handleErrors(async () => {
            await createWorkspot(image, name, location, description, type, features);
            onWorkspotCreated();
        });
    };

    return (
        <Container tag="section" className="top-20 w-max h-max p-20 rounded-lg bg-black bg-opacity-50 z-10 flex justify-center items-center">
            <Form onSubmit={handleCreateWorkspot}>
                <Input type="url" name="image" placeholder="Image url" />
                <TextArea name="name" placeholder="Name" />
                <TextArea name="description" placeholder="Description" />
                <TextArea name="street" placeholder="Street" />
                <TextArea name="postalCode" placeholder="Postal code" />
                <TextArea name="city" placeholder="City" />
                <TextArea name="country" placeholder="Country" />
                <TextArea name="latitude" placeholder="Latitude" />
                <TextArea name="longitude" placeholder="Longitude" />


                <div className="flex flex-col w-max gap-2">
                    District:
                    {Object.keys(districts).map(district => (
                        <label key={district}>
                            <input
                                type="checkbox"
                                checked={districts[district]}
                                onChange={() => toggleDistrict(district)}
                            />
                            {formatDistrictName(district)}
                        </label>
                    ))}

                    Type:
                    {Object.keys(type).map(TypeOption => (
                        <label key={TypeOption}>
                            <input
                                type="checkbox"
                                checked={type[TypeOption]}
                                onChange={() => toggleType(TypeOption)}
                            />
                            {TypeOption}
                        </label>
                    ))}

                    Wifi:
                    {Object.keys(wifi).map(wifiOption => (
                        <label key={wifiOption}>
                            <input
                                type="checkbox"
                                checked={wifi[wifiOption]}
                                onChange={() => toggleWifi(wifiOption)}
                            />
                            {wifiOption}
                        </label>
                    ))}

                    Plugs:
                    {Object.keys(plugs).map(PlugOption => (
                        <label key={PlugOption}>
                            <input
                                type="checkbox"
                                checked={plugs[PlugOption]}
                                onChange={() => togglePlugs(PlugOption)}
                            />
                            {PlugOption}
                        </label>
                    ))}

                    Noise:
                    {Object.keys(noise).map(NoiseOption => (
                        <label key={NoiseOption}>
                            <input
                                type="checkbox"
                                checked={noise[NoiseOption]}
                                onChange={() => toggleNoise(NoiseOption)}
                            />
                            {NoiseOption}
                        </label>
                    ))}


                    Features:
                    {Object.keys(otherFeatures).map(OtherFeaturesOption => (
                        <label key={OtherFeaturesOption}>
                            <input
                                type="checkbox"
                                checked={otherFeatures[OtherFeaturesOption]}
                                onChange={() => toggleOtherFeatures(OtherFeaturesOption)}
                            />
                            {OtherFeaturesOption}
                        </label>
                    ))}
                </div>

                <Button type="submit">Create</Button>
                <Button type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Container>
    );
}

