import { useContext, useEffect, useState } from "react"
import Context from "../../AppContext"
import { Text, Image, View } from 'react-native';

// import { utils } from '../../../com'

// const { extractSubFromToken } = utils

export default function NearbyPlayground({ playground, playground: { title, text, id, images, address, location: { coordinates, city, country, street } }, onToggleLikePost, onToggleSavePost, onEditPostButton, onHideMenuOptions, user, onPostDeleted, onMarkerPressedHandler }) {
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
            title={title}
            description={text}
            // image={PIN}
            onPress={() => {
                setCurrentMarker(playground)
                markerPressedHandler()
            }}
        >
            <Image source={images} className="rounded-2xl mb-2 w-full h-36 object-contain" />
            <Text className="font-bold text-sm leading-4 pr-1">{title}</Text>
            <Text className="line-clamp-3 text-xs pr-1">{street}, {city}</Text>
        </View>

    </>
}



