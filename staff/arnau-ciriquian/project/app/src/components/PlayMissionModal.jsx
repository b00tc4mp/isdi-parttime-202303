import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import retrieveMission from "../logic/retrieveMission.js"

export default function PlayMissionModal ({missionId, onCancel, onPlay}) {
    const [mission, setMission] = useState(null)

    const handleCloseMissionInfo = () => {
        onCancel()
    }

    const handlePlayMission = () => {
        console.log(mission)
        onPlay()
    }

    useEffect(() => {
        try {
            retrieveMission(missionId)
                .then(mission => {
                    setMission(mission)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error)
        }
    }, [missionId])

    return <View className="bg-slate-600">
        <Text>Hello world</Text>
        <TouchableOpacity onPress={handleCloseMissionInfo}><Text>CANCEL</Text></TouchableOpacity>
        <TouchableOpacity onPress={handlePlayMission}><Text>PLAY</Text></TouchableOpacity>
    </View>
}