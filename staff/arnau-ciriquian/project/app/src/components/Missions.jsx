import retrieveMissions from "../logic/retrieveMissions.js"
import AdminMission from "./admin/AdminMission.jsx"
import UserMission from "./UserMission.jsx"
import { ScrollView, View } from "react-native"
import { useState, useEffect } from "react"

export default function Missions({ onEditClicked, admin, onMissionClicked, character /*lastMissionsUpdate*/ }) {
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

    /*useEffect(() => {
        console.log('Missions -> "ComponentWillRecieveProps" with hooks')

        if (lastMissionsUpdate)
            handleRefreshMissions()

    }, [lastMissionsUpdate])*/

    if (admin) {
        return <ScrollView>
            {missions && missions.map(mission => <AdminMission
                key={mission.id}
                mission={mission}
                onEditClick={onEditClicked}
                admin={admin}
                onDeleteMissionClick={handleRefreshMissions}
            />)}
            <View className="h-10"></View>
        </ScrollView>
    } else {
        return <ScrollView>
            {missions && missions.map(mission => <UserMission
                key={mission.id}
                mission={mission}
                onMissionClicked={onMissionClicked}
                character={character}
            />)}
            <View className="h-10"></View>
        </ScrollView>
    }
}