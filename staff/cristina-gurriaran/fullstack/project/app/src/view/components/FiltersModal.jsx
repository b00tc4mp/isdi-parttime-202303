import { useState } from 'react';
import { useAppContext, useHandleErrors } from '../hooks'
import { Container, Form, Input, Button, TextArea, Label } from '../library'
import { formatCategory, formatOtherFeatures, formatDistrict, formatWifi, formatPlugs, formatNoise } from './helpers/dataFormatters'
import getFilteredWorkspots from '../../logic/getFilteredWorkspots';
import FilteredWorkspots from './FilteredWorkspots';

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


export default function FilterModal({ onCancel, onFilteredSearch }) {
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
    const togglePlugs = plugOption => {
        setPlugs(prevPlugs => ({
            ...prevPlugs,
            [plugOption]: !prevPlugs[plugOption],
        }));
    };

    const [noise, setNoise] = useState(initialNoise);
    const toggleNoise = noiseOption => {
        setNoise(prevNoise => ({
            ...prevNoise,
            [noiseOption]: !prevNoise[noiseOption],
        }));
    };

    const [category, setCategory] = useState(initialCategory);
    const toggleCategory = categoryOption => {
        setType(prevCategory => ({
            ...prevCategory,
            [categoryOption]: !prevCategory[categoryOption],
        }));
    };

    const [otherFeatures, setOtherFeatures] = useState(initialOtherFeatures);
    const toggleOtherFeatures = OtherFeaturesOption => {
        setOtherFeatures(prevOtherFeatures => ({
            ...prevOtherFeatures,
            [OtherFeaturesOption]: !prevOtherFeatures[OtherFeaturesOption],
        }));
    };

    const[features, setFeatures] = useState({
        wifi: wifi,
        plugs: plugs,
        noise: noise,
        otherFeatures: otherFeatures
    })

    const handleFilteredSearch = event => {
        event.preventDefault();
        onFilteredSearch(districts, category, features)
    };

    return (
        <div className="fixed top-1/4 w-1/2 h-1/2 overflow-auto bg-white shadow-lg rounded-lg">
        <Container tag="section" className="m-10">
            <Form onSubmit={handleFilteredSearch}>
  
                <div className="flex flex-col w-max">
                    District:
                    {Object.keys(districts).map(district => (
                        <label key={district}>
                            <input
                                type="checkbox"
                                checked={districts[district]}
                                onChange={() => toggleDistrict(district)}
                            />
                            {formatDistrict(district)}
                        </label>
                    ))}

                    Category:
                    {Object.keys(category).map(categoryOption => (
                        <label key={categoryOption}>
                            <input
                                type="checkbox"
                                checked={category[categoryOption]}
                                onChange={() => toggleCategory(categoryOption)}
                            />
                            {formatCategory(categoryOption)}
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
                            {formatWifi(wifiOption)}
                        </label>
                    ))}

                    Plugs:
                    {Object.keys(plugs).map(plugOption => (
                        <label key={plugOption}>
                            <input
                                type="checkbox"
                                checked={plugs[plugOption]}
                                onChange={() => togglePlugs(plugOption)}
                            />
                            {formatPlugs(plugOption)}
                        </label>
                    ))}

                    Noise:
                    {Object.keys(noise).map(noiseOption => (
                        <label key={noiseOption}>
                            <input
                                type="checkbox"
                                checked={noise[noiseOption]}
                                onChange={() => toggleNoise(noiseOption)}
                            />
                            {formatNoise(noiseOption)}
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
                            {formatOtherFeatures(OtherFeaturesOption)}
                        </label>
                    ))}
                </div>

                <Button type="submit">Search</Button>
                <Button type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Container>
            
     </div >
    );
}

