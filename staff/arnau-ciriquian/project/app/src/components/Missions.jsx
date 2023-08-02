import retrieveMissions from "../logic/retrieveMissions.js"
import Mission from "./Mission"
import { View } from "react-native"
import { useState, useEffect } from "react"

export default function Missions(/*{ onEditClicked, lastMissionsUpdate }*/) {
    const [missions, setMissions] = useState()

    useEffect(() => handleRefreshMissions(), [])

    const handleRefreshMissions = () => {
        try {
            retrieveMissions()
                .then(setMissions)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log('Missions -> "ComponentDidMount" with hooks')

        return () => console.log('Missions -> "ComponentWillUnmount" with hooks')
    }, [])

    /*useEffect(() => {
        console.log('Missions -> "ComponentWillRecieveProps" with hooks')

        if (lastMissionsUpdate)
            handleRefreshMissions()

    }, [lastMissionsUpdate])*/

    console.log('Missions -> render')

    return <View>
        {missions && missions.map(mission => <Mission
            key={mission.id}
            mission={mission}
            //onEditClick={onEditClicked}
            //onDeletePostClick={handleRefreshMissions}
        />)}
    </View>
}