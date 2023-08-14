import React, { useEffect, useState, useContext } from "react";

import {
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from '@gorhom/bottom-sheet';

import { Text, Image, View, ScrollView, Modal, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SHADY, LIKE, LIKE_FILLED, SUNNY, ADD } from '../../../assets/icons';
import Context from '../../AppContext.js'
import SingleElement from './SingleElement'
import { toggleLikePlayground } from "../../logic/playgrounds/toggleLikePlayground";
import retrievePlaygroundById from "../../logic/playgrounds/retrievePlaygroundById";

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Nearby({ closeHandle }) {
    const { currentView, setCurrentView, currentMarker, setCurrentMarker, TOKEN } = useContext(Context)
    const [playground, setPlayground] = useState()
    const [shady, setShady] = useState('bg-mainGray')
    const [sunny, setSunny] = useState('bg-mainGray')
    const [partial, setPartial] = useState('bg-mainGray')
    const [likes, setLikes] = useState(false)
    useEffect(() => {
        retrievePlaygroundById(TOKEN, currentMarker._id)
            .then(playground => {
                setPlayground(playground)
                setLikes(playground.likes)
                shady ? setShady('bg-mainLime') : setShady('bg-mainGray')
                sunny ? sunny('bg-mainYellow') : sunny('bg-mainGray')
                partial ? setPartial('bg-[#38F1A3]') : setPartial('bg-mainGray'
                )
            })
            .catch(error => error.message)
    }, [])

    useEffect(() => {
    }, [likes])

    const onLike = async () => {
        await toggleLikePlayground(TOKEN, playground._id)
            .then(() => {
                refreshLikes()
            })
    }

    const refreshLikes = () => {
        retrievePlaygroundById(TOKEN, currentMarker._id)
            .then(playground => {
                setLikes(playground.likes)
                shady ? setShady('bg-mainLime') : setShady('bg-mainGray')
                sunny ? sunny('bg-mainYellow') : sunny('bg-mainGray')
                partial ? setPartial('bg-[#38F1A3]') : setPartial('bg-mainGray'
                )
            })
            .catch(error => error.message)
    }


    return <View className="h-full bg-red-500z relative flex-column justify-between items-center bg-[blue]">
        {playground && <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-[blue]">
                <View className="w-full px-5 pb-12 bg-white dark:bg-gray-800  z-40 relative" >
                    <View className="ml-auto mt-1 z-50 flex-row items-center">
                        <Text className="text-center mr-2 text-lg">{likes.length}</Text>
                        <TouchableHighlight
                            className=""
                            activeOpacity={1.0}
                            underlayColor="#fff"
                            onPress={() => {
                                onLike()
                            }}>
                            <Image
                                className={`w-7 h-7 mx-auto `}
                                source={likes.length > 0 ? LIKE_FILLED : LIKE}
                            />
                        </TouchableHighlight>

                    </View>
                    <Text className="dark:text-white text-xl font-semibold">{playground.name}</Text>
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
                                <Text className="font-bold text-center text-sm rounded-full">Sunny</Text>
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


                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true} >
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
    </View >
}