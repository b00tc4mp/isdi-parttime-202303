import { PIN } from '../../../assets/icons';

import { useContext, useEffect, useState } from "react"

import MapView, { Marker, Callout } from 'react-native-maps'
import Context from "../../AppContext"
import { Text, Image } from 'react-native';

// import { utils } from '../../../com'

// const { extractSubFromToken } = utils

export default function Post({ playground, playground: { title, text, id, image, address, location }, onToggleLikePost, onToggleSavePost, onEditPostButton, onHideMenuOptions, user, onPostDeleted, onMarkerPressedHandler }) {
    // const userId = extractSubFromToken(context.token)
    // const userId = extractSubFromToken(context.token)

    const [userData, setUserData] = useState(user)
    const { setCurrentMarker } = useContext(Context)



    const markerPressedHandler = () => {
        setCurrentMarker(playground)
        onMarkerPressedHandler()
    }
    return <>
        <Marker
            tooltip={false}
            // resizeMode="contain"
            // resizeMethod="resize"
            key={playground._id}
            // className="w-20 h-10 object-contain"
            width={48}

            coordinate={{ latitude: location.coordinates[0], longitude: location.coordinates[1] }}
            title={title}
            description={text}
            // image={PIN}
            onPress={markerPressedHandler}
        >
            <Image source={PIN} className="w-[38px] h-[45px] object-contain" />
            <Callout tooltip >

            </Callout>
        </Marker>

    </>
}



