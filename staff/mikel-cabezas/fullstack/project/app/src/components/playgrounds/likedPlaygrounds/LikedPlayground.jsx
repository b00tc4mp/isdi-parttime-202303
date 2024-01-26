import { useContext, useEffect, useState } from "react"
import Context from "../../../AppContext"
import { Text, Image, View, TouchableHighlight } from 'react-native';

// import { utils } from '../../../com'

// const { extractSubFromToken } = utils

export default function LikedPlayground({ playground, playground: { name, text, id, images, address, location: { coordinates, city, country, street } }, onToggleLikePost, onToggleSavePost, onEditPostButton, onHideMenuOptions, user, onPostDeleted, onMarkerPressedHandler }) {
    // const userId = extractSubFromToken(context.token)
    // const userId = extractSubFromToken(context.token)
    const image = images[0]

    const [userData, setUserData] = useState(user)
    const { setCurrentMarker } = useContext(Context)

    const markerPressedHandler = () => {
        setCurrentMarker(playground)
        onMarkerPressedHandler()
    }
    const handleOpenMap = () => {
        // openMap({ latitude: playground.location.coordinates[0], longitude: playground.location.coordinates[1] })
        // createMapLink({ start, latitude: playground.location.coordinates[0], longitude: playground.location.coordinates[1], zoom: 20 })
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
        const latLng = `${playground.location.coordinates[0]},${playground.location.coordinates[1]}`
        const label = playground.name
        const url = Platform.select({
            ios: `${scheme}?address=${latLng}`,
            android: `${scheme}${latLng}`
        });
        Linking.openURL(url)
    }
    return <>
        <TouchableHighlight onPress={markerPressedHandler} activeOpacity={0.9} underlayColor="#fff">
            <View className="flex flex-row relative" >
                <View className="rounded-xl w-16 h-16 relative overflow-hidden flex justify-center items-center">
                    <Image source={{ uri: image }} className="w-28 h-28 object-contain " />
                </View>
                <View className="px-4 flex justify-center">
                    <Text className="font-bold text-sm text-[13px] leading-4 mt-2 pr-1">{name}</Text>
                    <Text className="text-[11px] pr-1 text-darkGreen">{street}</Text>
                    <Text className="text-[11px] pr-1 text-darkGreen italic">{city}</Text>
                </View>

            </View>
        </TouchableHighlight>
    </>
}



