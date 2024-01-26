import React, { useEffect, useState, useContext } from "react";
import { Text, Image, View, ScrollView, TextInput, Switch, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';

import { SHADY, LIKE, LIKE_FILLED, SUNNY, ADD } from '../../../assets/icons';
import Context from '../../AppContext.js'
import SingleElement from './SingleElement'
import SingleAge from './SingleAge'
import SunExposition from '../playgrounds/addPlayground/SunExposition'
import { toggleLikePlayground } from "../../logic/playgrounds/toggleLikePlayground";
import retrievePlaygroundById from "../../logic/playgrounds/retrievePlaygroundById";

export default function AdvancedSearch({ closeHandle }) {
    const { currentView, setCurrentView, currentMarker, setCurrentMarker, TOKEN } = useContext(Context)
    const [playground, setPlayground] = useState()
    const [elements, setElements] = useState([{ status: false, type: 'Slide' }, { status: false, type: 'Rider' }, { status: false, type: 'Swing' }, { status: false, type: 'Double Swing' }, { status: false, type: 'Seesaw' }, { status: false, type: 'Sandbox' }, { status: false, type: 'House' }, { status: false, type: 'Climber' }])
    const [activeAges, setActiveAges] = useState()
    const ages = [1, 2, 3, 4, 5, 6,]
    // const [ages, setAges] = useState([{ status: false, number: '+1' }, { status: false, number: '+2' }, { status: false, number: '+3' }, { status: false, number: '+4' }, { status: false, number: '+5' }, { status: false, number: '+6' }])

    const [playgroundCity, setPlaygroundCity] = useState()
    const [playgroundStreet, setPlaygroundStreet] = useState()
    const [playgroundCountry, setPlaygroundCountry] = useState()
    const [playgroundShady, setPlaygroundShady] = useState({ status: false, color: 'bg-mainGray' })
    const [playgroundSunny, setPlaygroundSunny] = useState({ status: false, color: 'bg-mainGray' })
    const [playgroundPartial, setPlaygroundPartial] = useState({ status: false, color: 'bg-mainGray' })

    const [shady, setShady] = useState('bg-mainGray')
    const [sunny, setSunny] = useState('bg-mainGray')
    const [partial, setPartial] = useState('bg-mainGray')

    const [value, setValue] = useState(0);


    const [isAccessible, setIsAccessible] = useState(false);

    enableScroll = () => this.setState({ scrollEnabled: true });
    disableScroll = () => this.setState({ scrollEnabled: false });

    const toggleSwitch = () => {
        console.log('isAccessible on toggle', isAccessible)
        setIsAccessible(previousState => !previousState)
    }
    const handleSearch = () => {
        alert('TODO - Advanced search query')
    }

    const handleElementPressed = elementName => {
        const updateElements = elements.map(element => {
            if (element.type === elementName)
                return { ...element, status: !element.status }
            return element
        })
        setElements(updateElements)
    }
    const handleAgePressed = age => {
        if (age === 1) setActiveAges([1])
        if (age === 2) setActiveAges([1, 2])
        if (age === 3) setActiveAges([1, 2, 3])
        if (age === 4) setActiveAges([1, 2, 3, 4])
        if (age === 5) setActiveAges([1, 2, 3, 4, 5])
        if (age === 6) setActiveAges([1, 2, 3, 4, 5, 6])
    }

    useEffect(() => {
    }, [isAccessible, elements, activeAges])

    return <View className="h-full bg-red-500z relative flex-column justify-between items-center bg-[blue]">
        {!playground && <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-[blue]">
                <View className="w-full px-5 pb-12 bg-white dark:bg-gray-800  z-40 relative" >


                    <View className="flex-row flex-wrap mt-4 mb-6 w-full">
                        <Text className="dark:text-white text-2xl font-semibold w-full">Advanced search</Text>
                        <SunExposition playgroundShady={playgroundShady} setPlaygroundShady={setPlaygroundShady} playgroundSunny={playgroundSunny} setPlaygroundSunny={setPlaygroundSunny} playgroundPartial={playgroundPartial} setPlaygroundPartial={setPlaygroundPartial} />
                    </View>
                    <View className="flex flex-wrap flex-row mb-6">
                        <Text className="dark:text-white text-lg font-semibold w-full">Age</Text>
                        {ages.map((age, index) => {
                            return <SingleAge activeAges={activeAges} age={age} key={index} mainColor="mainLime" onAgePressed={handleAgePressed} />
                        })}
                    </View>
                    <View className="flex flex-wrap flex-row mb-6">
                        <Text className="dark:text-white text-lg font-semibold w-full">Elements</Text>
                        {elements.map((element, index) => {
                            return <SingleElement element={element} key={index} mainColor="mainLime" onElementPressed={handleElementPressed} />
                        })}
                    </View>
                    <View className="flex-row items-center mb-6">
                        <Text className="dark:text-white text-lg font-bold mr-2 flex">Accessibility</Text>
                        <Switch
                            style={{ marginTop: 4, transform: [{ scaleX: .75 }, { scaleY: .75 }] }}
                            onValueChange={toggleSwitch}
                            value={isAccessible}
                        />
                    </View>
                    <View className="mb-6">
                        <Text className="dark:text-white text-lg  mb-1 font-semibold w-full">Distance</Text>
                        <View className="flex-row flex-wrap items-center">
                            <Slider
                                style={{ width: '60%', height: 40 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={20}
                                minimumTrackTintColor="#B8F138"
                                maximumTrackTintColor="#ECECEC"
                                onValueChange={setValue}
                            />
                            <Text className="ml-6">{value} km</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        underlayColor="#ffffff"
                        activeOpacity={0.8}
                        className="border border-mainLime bg-mainLime rounded-full mt-4 self-center w-full  "
                        onPress={handleSearch}
                    >
                        <View className="font-bold px-6 py-2 self-center rounded-full" >
                            <Text className="font-bold text-lg">Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
        }

        <View className="flex-row absolute bottom-0 bg-mainGrays w-full mx-auto justify-center z-50 pb-11">

        </View>
    </View >
}