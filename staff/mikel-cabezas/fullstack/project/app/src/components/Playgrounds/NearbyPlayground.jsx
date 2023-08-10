import { useContext, useEffect, useState } from "react"
import Context from "../../AppContext"
import { Text, Image, View } from 'react-native';

// import { utils } from '../../../com'

// const { extractSubFromToken } = utils

export default function NearbyPlayground({ playground, playground: { name, text, id, images, address, location: { coordinates, city, country, street } }, onToggleLikePost, onToggleSavePost, onEditPostButton, onHideMenuOptions, user, onPostDeleted, onMarkerPressedHandler }) {
    // const userId = extractSubFromToken(context.token)
    // const userId = extractSubFromToken(context.token)

    const [userData, setUserData] = useState(user)
    const { setCurrentMarker } = useContext(Context)

    const markerPressedHandler = () => {
        onMarkerPressedHandler()
    }
    return <>
        <View
            className="flex flex-col relative"
            title={name}
            description={text}
            // image={PIN}
            onPress={() => {
                setCurrentMarker(playground)
                markerPressedHandler()
            }}
        >
            <Image source={images} className="rounded-2xl w-full h-[168px] object-contain" />
            <Text className="font-bold text-sm text-[13px] leading-4 mt-2 pr-1">{name}</Text>
            <Text className="line-clamp-3 text-[11px] pr-1">{street}</Text>
        </View>

    </>
}



