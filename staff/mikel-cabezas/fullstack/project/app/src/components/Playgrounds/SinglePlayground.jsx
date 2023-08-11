import React, { useEffect, useState, useContext } from "react";

import { Text, Image, View, ScrollView, TouchableHighlight, TouchableOpacity, Modal, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SHADY, LIKE, LIKE_FILLED, SUNNY, ADD } from '../../../assets/icons';
import Context from '../../AppContext.js'
import SingleElement from './SingleElement'

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Nearby({ closeHandle }) {
    const { currentView, setCurrentView, currentMarker, setCurrentMarker } = useContext(Context)

    const onClose = () => {
        closeHandle()
    }
    const playground = currentMarker
    let { shady, sunny, partial } = currentMarker.sunExposition

    shady ? shady = 'bg-mainLime' : shady = 'bg-mainGray'
    sunny ? sunny = 'bg-mainYellow' : sunny = 'bg-mainGray'
    partial ? partial = 'bg-[#38F1A3]' : partial = 'bg-mainGray'


    return <View className="h-full bg-red-500z relative flex-column justify-between items-center bg-[blue]">
        {currentMarker && <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-[blue]">
                <View className="w-full px-5 pb-12 bg-white dark:bg-gray-800  z-40 relative" >
                    <TouchableHighlight
                        className=" ml-auto mt-1 z-50"
                        activeOpacity={1.0}
                        underlayColor="#fff"
                        onPress={() => {
                            onClose()
                            setCurrentView('')
                        }}>
                        <Image
                            className={`w-6 h-6 m-auto `}
                            source={LIKE}
                        />
                    </TouchableHighlight>
                    <Text className="dark:text-white pt-1 text-xl font-semibold">{playground.name}</Text>
                    <Text className="dark:text-white pt-1 text-sm max-w-[80vw] text-[#20841E] mb-2">{playground.location.street}</Text>
                    <View
                        className={`border border-mainLime bg-mainLime rounded-full mt-1 mb-2`}
                        onPress={() => { handleShady() }}>
                        <Text className="font-bold text-center text-sm px-5 py-2 w-full">Go to playground</Text>
                    </View>
                    <View className="flex-row flex-wrap gap-3 mb-4">
                        <Text className="dark:text-white text-lg mt-3 font-semibold w-full">Sun Exposition</Text>
                        <Text className="dark:text-white  mt-3 font-semibold w-full">There is no info yet... Tap fer edit!</Text>

                        <View
                            className={`border border-mainLime rounded-full ${shady}`}
                            onPress={() => { handleShady() }}>
                            <View className="font-bold px-3 py-2 rounded-full flex-row">
                                <Image className="w-5 h-5 mr-2" source={SHADY} />
                                <Text className="font-bold text-center text-sm rounded-full">Shady</Text>
                            </View>
                        </View>
                        <View
                            className={`border border-mainYellow rounded-full ${sunny}`}
                            onPress={() => { handleShady() }}>
                            <View className="font-bold px-3 py-2 rounded-full flex-row">
                                <Image className="w-5 h-5 mr-2" source={SUNNY} />
                                <Text className="font-bold text-center text-sm rounded-full">{ }</Text>
                            </View>
                        </View>
                        <View
                            className={`border border-[#38F1A3] rounded-full ${partial}`}
                            onPress={() => { handleShady() }}>
                            <View className="font-bold px-3 py-2 rounded-full flex-row">
                                <Image className="w-5 h-5 mr-2" source={SUNNY} />
                                <Text className="font-bold text-center text-sm rounded-full">Partial</Text>
                            </View>
                        </View>
                    </View>
                    {playground.elements.length !== 0 ? playground.elements.map((element, index) => {
                        return <SingleElement element={element} key={index} />
                    }) :
                        <View className="flex-row flex-wrap gap-3 mb-4">
                            <Text className="dark:text-white text-lg mt-3 font-semibold w-full">Elements</Text>
                            <Text className="dark:text-white  mt-3 font-semibold w-full">There is no elements yet...</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                className={`border border-mainLime  rounded-full mb-1 mt-2 mr-2 bg-mainGray`}
                                onPress={() => { }}>
                                <View className="font-bold px-3 py-0.5 flex-row items-center">
                                    <Text className={`font-bold text-center text-sm`}>Add one!</Text>

                                    <View className="flex justify-center justify-items-center p-1 ml-2">
                                        <Image className="h-6 w-6 object-cover" source={ADD} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    }
                    {playground.description && playground.description !== '-' &&
                        <View className="flex-row gap-3 mb-4">
                            <Text className="pt-1 text-xl font-semibold">{playground.description}</Text>
                        </View>}


                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <View className="flex-row gap-3">
                            {playground.images.length > 0 && playground.images.map((image, index) => {
                                return <Image
                                    className="w-36 h-40 object-cover rounded-2xl"
                                    key={index}
                                    source={{ uri: image }}
                                />
                            })}
                        </View>
                    </ScrollView>


                </View>

            </ScrollView>

        </>
        }
        <View className="flex-row absolute bottom-0 bg-mainGrays w-full mx-auto justify-center z-50 pb-11">

        </View>
    </View>
}