import React, { useEffect, useState, useContext } from "react";

import { Text, Image, View, ScrollView, TouchableHighlight, Modal, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CLOSE } from '../../../assets/icons';
import Context from '../../AppContext.js'

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Nearby({ closeHandle, park }) {
    const { currentView, setCurrentView } = useContext(Context)
    const { currentMarker, setCurrentMarker } = useContext(Context)
    // const { currentMarker, setCurrentMarker } = useContext(Context)
    const [animation, setAnimation] = useState('fadeInUp')

    const onClose = () => {
        setAnimation('fadeOutDown')
        closeHandle()
        setAnimation()
    }
    const playground = currentMarker

    return <>
        {park &&
            <Animatable.View animation={animation} duration={200} className="w-full left-0 absolute bottom-0 h-auto max-h-max p-5 pr-0 bg-white rounded-[20px] mx-auto z-50" >
                <TouchableHighlight
                    className=" m-auto absolute right-0 top-0 mr-2 mt-1 z-50"
                    activeOpacity={1.0}
                    underlayColor="#fff"
                    onPress={() => {
                        onClose()
                        setCurrentView('')
                    }}>
                    <Image
                        className={`w-8 h-8 m-auto `}
                        source={CLOSE}
                    />
                </TouchableHighlight>
                <Text className="pt-4 text-xl font-semibold">{playground.title}</Text>
                <Text className="pt-4 text-xs max-w-[80vw] text-[#20841E] mb-10">{playground.address}</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View className="flex-row gap-3">
                        {playground.image.length > 0 && playground.image.map(image => {
                            return <Image
                                className="w-36 h-40 object-cover rounded-2xl"
                                key={image.length}
                                source={{
                                    uri: image,
                                }}
                            />
                        })}
                    </View>
                </ScrollView>
            </Animatable.View>
        }
    </>
}