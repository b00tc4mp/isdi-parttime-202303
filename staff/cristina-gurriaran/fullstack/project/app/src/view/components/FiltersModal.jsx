import { useState } from 'react';
import { useAppContext } from '../hooks'
import { Container, Form, Input, Button, TextArea, Label, CheckboxContainer } from '../library'
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


export default function FilterModal({ onCancel, onFilteredSearch }) {
    const { alert } = useAppContext();

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
        setCategory(prevCategory => ({
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

    const features = {
        wifi: wifi,
        plugs: plugs, 
        noise: noise, 
        otherFeatures: otherFeatures
    }

    const handleFilteredSearch = event => {
        event.preventDefault();
        onFilteredSearch(districts, category, features)
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-gray-dark w-full h-full px-5 bg-opacity-60">
                <div className="overflow-auto mx-auto bg-white md:w-1/2 lg:w-2/3 xl:w-2/3 sm:w-full h-2/3 m-20 p-10 rounded-md">
                <Form className="flex flex-col gap-4" onSubmit={handleFilteredSearch}>
  
                    <CheckboxContainer className="flex flex-col">
                        <label className="font-bold">Districts:</label>
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
                    </CheckboxContainer>

                    <CheckboxContainer className="flex flex-col">
                        <label className="font-bold">Category:</label>
                        <div className="pl-4 flex flex-col gap-4">
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
                        </div>
                    </CheckboxContainer>

                    <CheckboxContainer className="flex flex-col">
                        <label className="font-bold">Wifi:</label>
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
                    </CheckboxContainer>

                    <CheckboxContainer className="flex flex-col">
                        <label className="font-bold">Plugs:</label>
                        <div className="flex flex-row gap-4 justify-between">
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
                        </div>
                    </CheckboxContainer>


                    <CheckboxContainer className="flex flex-col">
                        <label className="font-bold">Noise:</label>
                        <div className="flex flex-row gap-4 justify-between">
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
                        </div>
                    </CheckboxContainer>


                    <CheckboxContainer className="flex flex-col">
                        <label className="font-bold">Other Features:</label>
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
                    </CheckboxContainer>

                <Button type="submit">Search</Button>
                <Button type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
                </div>
            </div >
        </div >
    )
}

