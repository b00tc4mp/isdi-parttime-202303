import React, { useEffect, useState, useContext } from "react";

import { Text, Image, View, ScrollView, TouchableHighlight, Modal, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CLOSE } from '../../../assets/icons';
import Context from '../../AppContext.js'



import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
    default: "native",
});

export default function Nearby({ closeHandle, playground }) {
    const { currentView, setCurrentView } = useContext(Context)
    const { currentMarker, setCurrentMarker } = useContext(Context)
    // const { currentMarker, setCurrentMarker } = useContext(Context)
    const [animation, setAnimation] = useState('fadeInUp')



    const onClose = () => {
        setAnimation('fadeOutDown')
        closeHandle()
        setAnimation()
    }
    const currentPlayground = currentMarker

    return <>
        {currentMarker &&
            <View animation={animation} duration={200} className="w-full  p-5 pr-0 bg-white rounded-[20px] mx-auto z-50" >
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
                <Text className="pt-4 text-xl font-semibold">{currentPlayground.name}</Text>
                <Text className="pt-1 text-sm max-w-[80vw] text-[#20841E] mb-10">{currentPlayground.location.street}</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View className="flex-row gap-3">
                        {currentPlayground.images.length > 0 && currentPlayground.images.map(image => {
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
            </View>
        }
    </>
}