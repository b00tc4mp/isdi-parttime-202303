import React, { useEffect, useState, useContext } from "react";

import {
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet';

import { Text, Image, View, ScrollView, TextInput, Switch } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'


import { SHADY, LIKE, LIKE_FILLED, SUNNY, ADD } from '../../../assets/icons';
import Context from '../../AppContext.js'
import SingleElement from '../Header/SingleElement'
import SunExposition from '../Playgrounds/addPlayground/SunExposition'
import { toggleLikePlayground } from "../../logic/playgrounds/toggleLikePlayground";
import retrievePlaygroundById from "../../logic/playgrounds/retrievePlaygroundById";

export default function AdvancedSearch({ closeHandle }) {
    const { currentView, setCurrentView, currentMarker, setCurrentMarker, TOKEN } = useContext(Context)
    const [playground, setPlayground] = useState()
    const [elements, setElements] = useState([{ status: false, type: 'Slide' }, { status: false, type: 'Rider' }, { status: false, type: 'Swing' }, { status: false, type: 'Double Swing' }, { status: false, type: 'Seesaw' }, { status: false, type: 'Sandbox' }, { status: false, type: 'House' }, { status: false, type: 'Climber' }])

    const [playgroundCity, setPlaygroundCity] = useState()
    const [playgroundStreet, setPlaygroundStreet] = useState()
    const [playgroundCountry, setPlaygroundCountry] = useState()
    const [playgroundShady, setPlaygroundShady] = useState({ status: false, color: 'bg-mainGray' })
    const [playgroundSunny, setPlaygroundSunny] = useState({ status: false, color: 'bg-mainGray' })
    const [playgroundPartial, setPlaygroundPartial] = useState({ status: false, color: 'bg-mainGray' })



    const [shady, setShady] = useState('bg-mainGray')
    const [sunny, setSunny] = useState('bg-mainGray')
    const [partial, setPartial] = useState('bg-mainGray')

    const [isAccessible, setIsAccessible] = useState(false);

    const toggleSwitch = () => {
        console.log('isAccessible on toggle', isAccessible)
        setIsAccessible(previousState => !previousState)
    }

    const handleElementPressed = element => {
        console.log(element)
        const updateElements = elements.map(element => {
            if (element.type === element) {
                const currentStatus = element.status
                return { ...element, status: !currentStatus }
            }
            return element
        })
        setElements(updateElements)

    }

    useEffect(() => {
    }, [isAccessible, elements])

    return <View className="h-full bg-red-500z relative flex-column justify-between items-center bg-[blue]">
        {!playground && <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-[blue]">
                <View className="w-full px-5 pb-12 bg-white dark:bg-gray-800  z-40 relative" >

                    <Text className="dark:text-white text-2xl font-semibold">Advanced search</Text>
                    <View className="flex-row items-center">
                        <Text className="dark:text-white mt-1 text-sm font-bold mr-3 flex">Accessibility</Text>
                        <ToggleSwitch
                            isOn={isAccessible}
                            onToggle={toggleSwitch}
                            onColor="#B8F138"
                            offColor="#ECECEC"
                            size="medium"
                        />

                    </View>
                    <View className="flex-row flex-wrap gap-3 mb-4">
                        <SunExposition playgroundShady={playgroundShady} setPlaygroundShady={setPlaygroundShady} playgroundSunny={playgroundSunny} setPlaygroundSunny={setPlaygroundSunny} playgroundPartial={playgroundPartial} setPlaygroundPartial={setPlaygroundPartial} />
                    </View>
                    <View>
                    </View>
                    <View className="flex flex-wrap flex-row">
                        {elements.map((element, index) => {
                            return <SingleElement element={element} key={index} mainColor="mainLime" onElementPressed={handleElementPressed} />
                        })}
                    </View>
                </View>

            </ScrollView>

        </>
        }

        <View className="flex-row absolute bottom-0 bg-mainGrays w-full mx-auto justify-center z-50 pb-11">

        </View>
    </View >
}